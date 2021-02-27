import {DefaultCrudRepository} from '@loopback/repository';
import {UserWord, UserWordRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserWordRepository extends DefaultCrudRepository<
  UserWord,
  typeof UserWord.prototype.id,
  UserWordRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(UserWord, dataSource);
  }
}
