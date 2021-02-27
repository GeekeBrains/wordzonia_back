import {DefaultCrudRepository} from '@loopback/repository';
import {Parsing, ParsingRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParsingRepository extends DefaultCrudRepository<
  Parsing,
  typeof Parsing.prototype.id,
  ParsingRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(Parsing, dataSource);
  }
}
