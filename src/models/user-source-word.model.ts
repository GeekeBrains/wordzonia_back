import {Entity, model, property} from '@loopback/repository';

@model()
export class UserSourceWord extends Entity {
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
  sourceId?: string;

  @property({
    type: 'string',
  })
  wordId?: string;

  constructor(data?: Partial<UserSourceWord>) {
    super(data);
  }
}

export interface UserSourceWordRelations {
  // describe navigational properties here
}

export type UserSourceWordWithRelations = UserSourceWord &
  UserSourceWordRelations;
