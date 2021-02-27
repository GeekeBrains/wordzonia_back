import {DefaultCrudRepository} from '@loopback/repository';
import {Paragraph, ParagraphRelations} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParagraphRepository extends DefaultCrudRepository<
  Paragraph,
  typeof Paragraph.prototype.id,
  ParagraphRelations
> {
  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource,
  ) {
    super(Paragraph, dataSource);
  }
}
