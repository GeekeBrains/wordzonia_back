import {DefaultCrudRepository} from '@loopback/repository';
import {SourceWord, SourceWordRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SourceWordRepository extends DefaultCrudRepository<
  SourceWord,
  typeof SourceWord.prototype.id,
  SourceWordRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(SourceWord, dataSource);
  }
}
