import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Parsing extends Entity {
    @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id: number;

  @property({
    type: 'string',
    id: true,
  })
  url: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Parsing>) {
    super(data);
  }
}

export interface ParsingRelations {
  // describe navigational properties here
}

export type ParsingWithRelations = Parsing & ParsingRelations;
