import {Entity, model, property, hasMany} from '@loopback/repository';
import {UserSource} from './user-source.model';
import {UserSourceWord} from './user-source-word.model';
import {SourceWord} from './source-word.model';
import {SourceSentence} from './source-sentence.model';

@model()
export class Source extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  url: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createDate?: string;

  @property({
    type: 'date',
  })
  lastImportDate?: string;

  @hasMany(() => UserSource)
  userSources: UserSource[];

  @hasMany(() => UserSourceWord)
  userSourceWords: UserSourceWord[];

  @hasMany(() => SourceWord)
  sourceWords: SourceWord[];

  @hasMany(() => SourceSentence)
  sourceSentences: SourceSentence[];

  constructor(data?: Partial<Source>) {
    super(data);
  }
}

export interface SourceRelations {
  // describe navigational properties here
}

export type SourceWithRelations = Source & SourceRelations;
