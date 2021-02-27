import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Source, SourceRelations, UserSource, UserSourceWord, SourceWord, SourceSentence} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserSourceRepository} from './user-source.repository';
import {UserSourceWordRepository} from './user-source-word.repository';
import {SourceWordRepository} from './source-word.repository';
import {SourceSentenceRepository} from './source-sentence.repository';

export class SourceRepository extends DefaultCrudRepository<
  Source,
  typeof Source.prototype.id,
  SourceRelations
> {

  public readonly userSources: HasManyRepositoryFactory<UserSource, typeof Source.prototype.id>;

  public readonly userSourceWords: HasManyRepositoryFactory<UserSourceWord, typeof Source.prototype.id>;

  public readonly sourceWords: HasManyRepositoryFactory<SourceWord, typeof Source.prototype.id>;

  public readonly sourceSentences: HasManyRepositoryFactory<SourceSentence, typeof Source.prototype.id>;

  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource, @repository.getter('UserSourceRepository') protected userSourceRepositoryGetter: Getter<UserSourceRepository>, @repository.getter('UserSourceWordRepository') protected userSourceWordRepositoryGetter: Getter<UserSourceWordRepository>, @repository.getter('SourceWordRepository') protected sourceWordRepositoryGetter: Getter<SourceWordRepository>, @repository.getter('SourceSentenceRepository') protected sourceSentenceRepositoryGetter: Getter<SourceSentenceRepository>,
  ) {
    super(Source, dataSource);
    this.sourceSentences = this.createHasManyRepositoryFactoryFor('sourceSentences', sourceSentenceRepositoryGetter,);
    this.registerInclusionResolver('sourceSentences', this.sourceSentences.inclusionResolver);
    this.sourceWords = this.createHasManyRepositoryFactoryFor('sourceWords', sourceWordRepositoryGetter,);
    this.registerInclusionResolver('sourceWords', this.sourceWords.inclusionResolver);
    this.userSourceWords = this.createHasManyRepositoryFactoryFor('userSourceWords', userSourceWordRepositoryGetter,);
    this.registerInclusionResolver('userSourceWords', this.userSourceWords.inclusionResolver);
    this.userSources = this.createHasManyRepositoryFactoryFor('userSources', userSourceRepositoryGetter,);
    this.registerInclusionResolver('userSources', this.userSources.inclusionResolver);
  }
}
