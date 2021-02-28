import {Entity, model, property} from '@loopback/repository';

@model()
export class Meaning extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  spanishDef?: string;

  @property({
    type: 'number',
    required: true,
  })
  count: number;

  constructor(data?: Partial<Meaning>) {
    super(data);
  }
}

export interface MeaningRelations {
  // describe navigational properties here
}

export type MeaningWithRelations = Meaning & MeaningRelations;
