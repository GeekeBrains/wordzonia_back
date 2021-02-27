import {DefaultCrudRepository} from '@loopback/repository';
import {Meaning, MeaningRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MeaningRepository extends DefaultCrudRepository<
  Meaning,
  typeof Meaning.prototype.id,
  MeaningRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(Meaning, dataSource);
  }
}
