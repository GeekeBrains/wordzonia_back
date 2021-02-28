import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import axios from 'axios';
import textversionjs from 'textversionjs';
import {WordRepository} from '../repositories';

// Lorca LA CAÑA: https://github.com/dmarman/lorca
// Para hacer resumenes    https://github.com/topliceanu/sum

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
    return true;
  }
}
