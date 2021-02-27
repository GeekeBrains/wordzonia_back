import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WordzoniaDataSource} from '../datasources';
import {Sentence, SentenceRelations} from '../models';

export class SentenceRepository extends DefaultCrudRepository<
  Sentence,
  typeof Sentence.prototype.id,
  SentenceRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(Sentence, dataSource);
  }
}
