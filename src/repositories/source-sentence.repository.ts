import {DefaultCrudRepository} from '@loopback/repository';
import {SourceSentence, SourceSentenceRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SourceSentenceRepository extends DefaultCrudRepository<
  SourceSentence,
  typeof SourceSentence.prototype.id,
  SourceSentenceRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(SourceSentence, dataSource);
  }
}
