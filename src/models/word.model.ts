import {Entity, model, property} from '@loopback/repository';

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
  desc?: string;

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
