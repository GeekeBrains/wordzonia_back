import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Word} from '../models';
import {
  SourceWordRepository,
  UserSourceRepository,
  UserSourceWordRepository,
  UserWordRepository,
  WordRepository,
} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class WordService {
  constructor(
    @repository(WordRepository)
    public wordRepository: WordRepository,
    @repository(SourceWordRepository)
    public sourceWordRepository: SourceWordRepository,
    @repository(UserWordRepository)
    public userWordRepository: UserWordRepository,
    @repository(UserSourceRepository)
    public userSourceRepository: UserSourceRepository,
    @repository(UserSourceWordRepository)
    public userSourceWordRepository: UserSourceWordRepository,
  ) {}

  async addWord(wordStr: string): Promise<boolean> {
    const natural = require('natural');

    console.log(wordStr);

    // Is not a word? >> RETURN
    if (!isNaN(+wordStr)) {
      return false;
    }

    wordStr = wordStr.toLowerCase();

    const WordPOS = require('wordpos');
    const wordpos = new WordPOS();
    // Details of the word!!!
    // wordpos.lookup(word, (r: any) => {
    //   console.log('wordpos', r);
    // });

    //
    let stemStr = natural.PorterStemmer.stem(wordStr);

    const wordObj = await this.wordRepository.findOne({where: {word: wordStr}});
    const stemObj = await this.wordRepository.findOne({where: {word: stemStr}});
    // Is new the word? ----------------
    if (!wordObj) {
      if (wordStr === stemStr) {
        stemStr = null;
      }
      console.log('WordService NEW word: ' + wordStr + ' stem: ' + stemStr);
      const isNoun = await wordpos.isNoun(wordStr);
      const isVerb = await wordpos.isVerb(wordStr);
      const isAdjective = await wordpos.isAdjective(wordStr);
      const isAdverb = await wordpos.isAdverb(wordStr);

      const wrd: Word = new Word({
        word: wordStr.toLowerCase(),
        stem: stemStr,
        isNoun,
        isVerb,
        isAdjective,
        isAdverb,
        count: 1,
      });
      await this.wordRepository.create(wrd);
    } else {
      ++wordObj.count;
      await this.wordRepository.update(wordObj);
    }

    // Is new the stem word? ----------------
    if (!stemObj) {
      const isNoun = await wordpos.isNoun(stemStr);
      const isVerb = await wordpos.isVerb(stemStr);
      const isAdjective = await wordpos.isAdjective(stemStr);
      const isAdverb = await wordpos.isAdverb(stemStr);

      const wrd: Word = new Word({
        word: stemStr.toLowerCase(),
        isNoun,
        isVerb,
        isAdjective,
        isAdverb,
        count: 0,
        countPlusStem: 1,
      });
      console.log('WordService NEW stem: ' + stemStr);
      await this.wordRepository.create(wrd);
    } else {
      ++stemObj.countPlusStem;
      await this.wordRepository.update(stemObj);
    }

    // wordpos.getAdjectives(
    //   'The angry bear chased the frightened little squirrel.',
    //   function (result) {
    //     'texto to tokenize', console.log({wordId, result});
    //   },
    // );
    // [ 'little', 'angry', 'frightened' ]

    // wordpos.isAdjective('awesome', function (result) {
    //   console.log(result);
    // });
    // // true 'awesome'

    return true;
  }

  async addUserSourceWord(
    userId: string,
    sourceId: string,
    wordId: string,
  ): Promise<boolean> {
    // Existe word para la source?
    return false;
  }

  async addUserWord(userId: string, word: string): Promise<boolean> {
    return false;
  }

  async addSourceWord(word: string): Promise<boolean> {
    return false;
  }
}
