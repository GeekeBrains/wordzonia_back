import {Entity, model, property} from '@loopback/repository';

@model()
export class UserSource extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  sourceId?: string;

  constructor(data?: Partial<UserSource>) {
    super(data);
  }
}

export interface UserSourceRelations {
  // describe navigational properties here
}

export type UserSourceWithRelations = UserSource & UserSourceRelations;
