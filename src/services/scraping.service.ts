import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import axios from 'axios';
import textversionjs from 'textversionjs';
import {Word} from '../models';
import {WordRepository} from '../repositories';

// Lorca LA CAÑA: https://github.com/dmarman/lorca

@injectable({scope: BindingScope.TRANSIENT})
export class ScrapingService {
  constructor(
    @repository(WordRepository)
    public wordRepository: WordRepository,
  ) {}

  /*
   * Add service methods here
   */

  // scrape-it
  // Cheerio +
  // JSDOM Permite manipular el DOM

  async get(url: string): Promise<boolean> {
    const resp = await axios.get(url);

    const text = textversionjs(resp.data, {
      // "underline", "linebreak", "hashify"
      headingStyle: 'linebreak',
      // "indentation", "linebreak"
      listStyle: 'linebreak',
      linkProcess: (href, linkText) => {
        // return linkText + ' ' + '(' + href + ')';
        return linkText;
      },
      imgProcess: (src, alt) => {
        return '';
      },
    });

    const natural = require('natural');
    // Existe varias posibilidad de tokenizar por idioma, etc..
    const tokenizer = new natural.AggressiveTokenizer();
    const tkns = tokenizer.tokenize(text);

    console.log(tkns);
    // const $ = cheerio.load(resp.data);
    // const

    tkns.map((tkn: string) => {
      try {
        // Is numeric?
        if (isNaN(+tkn)) {
          tkn = tkn.toLowerCase();
          const wrd: Word = new Word({id: tkn});
          // eslint-disable-next-line no-void
          void this.wordRepository.create(wrd);
        }
      } catch (e) {
        if (e.code !== 11000) {
          console.log(e);
        }
      }
      return false;
    });
    return true;

// natural.PorterStemmer.attach();
// const sentence = 'A process for removing the commoner morphological and inflexional endings from words in English.';
// sentence.tokenizeAndStem();
// // ["process", "remov", "common", "morpholog", "inflexion", "end", "word", "english"]


    // const $ = cheerio.load('<h2 class="title">Hello world</h2>');

    // $('h2.title').text('Hello there!');
    // $('h2').addClass('welcome');

    // $.html();
  }
}




