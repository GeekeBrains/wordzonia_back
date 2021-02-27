import {Entity, model, property, hasMany} from '@loopback/repository';
import {UserWord} from './user-word.model';
import {UserSourceWord} from './user-source-word.model';
import {SourceWord} from './source-word.model';

/**
 * Each word/phonetic can be any means in any languajes.
 */
@model({settings: {strict: false}})
export class Word extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
  })
  phonetics?: string;

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
