import {DefaultCrudRepository} from '@loopback/repository';
import {UserSourceWord, UserSourceWordRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserSourceWordRepository extends DefaultCrudRepository<
  UserSourceWord,
  typeof UserSourceWord.prototype.id,
  UserSourceWordRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(UserSourceWord, dataSource);
  }
}
