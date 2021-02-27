import {Entity, model, property, hasMany} from '@loopback/repository';
import {SourceSentence} from './source-sentence.model';

@model()
export class Sentence extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @hasMany(() => SourceSentence)
  sourceSentences: SourceSentence[];

  constructor(data?: Partial<Sentence>) {
    super(data);
  }
}

export interface SentenceRelations {
  // describe navigational properties here
}

export type SentencesWithRelations = Sentence & SentenceRelations;
