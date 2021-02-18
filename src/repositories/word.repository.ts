import {DefaultCrudRepository} from '@loopback/repository';
import {Word, WordRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WordRepository extends DefaultCrudRepository<
  Word,
  typeof Word.prototype.id,
  WordRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(Word, dataSource);
  }
}
