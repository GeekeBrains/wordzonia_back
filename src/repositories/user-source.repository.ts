import {DefaultCrudRepository} from '@loopback/repository';
import {UserSource, UserSourceRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserSourceRepository extends DefaultCrudRepository<
  UserSource,
  typeof UserSource.prototype.id,
  UserSourceRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(UserSource, dataSource);
  }
}
