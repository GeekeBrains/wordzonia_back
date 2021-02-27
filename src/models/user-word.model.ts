import {Entity, model, property} from '@loopback/repository';

@model()
export class UserWord extends Entity {
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
  userId?: string;

  @property({
    type: 'string',
  })
  wordId?: string;

  constructor(data?: Partial<UserWord>) {
    super(data);
  }
}

export interface UserWordRelations {
  // describe navigational properties here
}

export type UserWordWithRelations = UserWord & UserWordRelations;
