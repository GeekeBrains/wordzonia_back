import {Entity, model, property} from '@loopback/repository';

@model()
export class SourceWord extends Entity {
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
  wordId?: string;

  constructor(data?: Partial<SourceWord>) {
    super(data);
  }
}

export interface SourceWordRelations {
  // describe navigational properties here
}

export type SourceWordWithRelations = SourceWord & SourceWordRelations;
