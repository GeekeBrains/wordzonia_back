import {Entity, hasMany, model, property} from '@loopback/repository';
import {SourceWord} from './source-word.model';
import {UserSourceWord} from './user-source-word.model';
import {UserWord} from './user-word.model';

/**
 * Each word/phonetic can be any means in any languajes.
 */
@model({settings: {strict: false}})
export class Word extends Entity {
  // In Ingles the same word is writed by two speack words
  // width distint type of means: live, /laiv/ u /liv/
  // then use a automatic diferent key instead the word.
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  // Palabra escrita
  @property({
    type: 'string',
  })
  word?: string;

  @property({
    type: 'number',
    default: 0,
  })
  count: number;

  @property({
    type: 'string',
  })
  phonetics?: string;

  // Steam is the main word of other declination words.
  // Ex: 'draft' >> is the stem of >> 'drafting'
  // If is empty, the word is the steam it selft.
  @property({
    type: 'string',
    default: null,
  })
  stem?: string;

  // Count the number that occurs whit her word a plus her stem derivateds.
  @property({
    type: 'number',
    default: 0,
  })
  countPlusStem: number;

  // Depend of the context can be diferent type of word
  @property({
    type: 'boolean',
  })
  isNoun?: boolean;

  @property({
    type: 'boolean',
  })
  isVerb?: boolean;

  @property({
    type: 'boolean',
  })
  isAdjective?: boolean;

  @property({
    type: 'boolean',
  })
  isAdverb?: boolean;

  @hasMany(() => UserWord)
  userWords: UserWord[];

  @hasMany(() => UserSourceWord)
  userSourceWords: UserSourceWord[];

  @hasMany(() => SourceWord)
  sourceWords: SourceWord[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Word>) {
    super(data);
  }
}

export interface WordRelations {
  // describe navigational properties here
}

export type WordWithRelations = Word & WordRelations;
