import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {WordService} from './word.service';

@injectable({scope: BindingScope.TRANSIENT})
export class ParsingService {
  constructor(
    @service(WordService)
    private wordService: WordService,
  ) {}

  async parse(text: string): Promise<boolean> {
    const natural = require('natural');
    // Existe varias posibilidad de tokenizar por idioma, etc..
    // const tokenizer = new natural.AggressiveTokenizer();
    const tokenizer = new natural.WordTokenizer();
    const tkns = tokenizer.tokenize(text);

    tkns.map(async (tkn: string) => {
      const ok = await this.wordService.addWord(tkn);
      if (!ok) {
        console.log('Not parsing ' + tkn);
      }
    });
    return true;

    // natural.PorterStemmer.attach();
    // const sentence = 'A process for removing the commoner morphological and inflexional endings from words in English.';
    // sentence.tokenizeAndStem();
    // // ["process", "remov", "common", "morpholog", "inflexion", "end", "word", "english"]
  }
}
