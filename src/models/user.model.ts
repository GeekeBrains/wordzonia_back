import {Entity, model, property, hasMany} from '@loopback/repository';
import {UserWord} from './user-word.model';
import {UserSource} from './user-source.model';
import {UserSourceWord} from './user-source-word.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  age?: number;

  @property({
    type: 'date',
  })
  birth__date?: string;

  @hasMany(() => UserWord)
  userWords: UserWord[];

  @hasMany(() => UserSource)
  userSources: UserSource[];

  @hasMany(() => UserSourceWord)
  userSourceWords: UserSourceWord[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
