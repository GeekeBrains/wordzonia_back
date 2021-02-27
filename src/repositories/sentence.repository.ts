import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Sentence, SentenceRelations, SourceSentence} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SourceSentenceRepository} from './source-sentence.repository';

export class SentenceRepository extends DefaultCrudRepository<
  Sentence,
  typeof Sentence.prototype.id,
  SentenceRelations
> {

  public readonly sourceSentences: HasManyRepositoryFactory<SourceSentence, typeof Sentence.prototype.id>;

  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource, @repository.getter('SourceSentenceRepository') protected sourceSentenceRepositoryGetter: Getter<SourceSentenceRepository>,
  ) {
    super(Sentence, dataSource);
    this.sourceSentences = this.createHasManyRepositoryFactoryFor('sourceSentences', sourceSentenceRepositoryGetter,);
    this.registerInclusionResolver('sourceSentences', this.sourceSentences.inclusionResolver);
  }
}
