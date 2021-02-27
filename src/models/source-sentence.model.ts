import {Model, model, property} from '@loopback/repository';

@model()
export class SourceSentence extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  count: number;

  @property({
    type: 'string',
  })
  sourceId?: string;

  @property({
    type: 'string',
  })
  sentenceId?: string;

  constructor(data?: Partial<SourceSentence>) {
    super(data);
  }
}

export interface SourceSentenceRelations {
  // describe navigational properties here
}

export type SourceSentenceWithRelations = SourceSentence &
  SourceSentenceRelations;
