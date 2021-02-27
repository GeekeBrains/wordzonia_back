import {Entity, model, property} from '@loopback/repository';

@model()
export class Paragraph extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  orderInSource: number;

  constructor(data?: Partial<Paragraph>) {
    super(data);
  }
}

export interface ParagraphRelations {
  // describe navigational properties here
}

export type ParagraphWithRelations = Paragraph & ParagraphRelations;
