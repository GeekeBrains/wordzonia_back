import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Word, WordRelations, UserWord, UserSourceWord, SourceWord} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserWordRepository} from './user-word.repository';
import {UserSourceWordRepository} from './user-source-word.repository';
import {SourceWordRepository} from './source-word.repository';

export class WordRepository extends DefaultCrudRepository<
  Word,
  typeof Word.prototype.id,
  WordRelations
> {

  public readonly userWords: HasManyRepositoryFactory<UserWord, typeof Word.prototype.id>;

  public readonly userSourceWords: HasManyRepositoryFactory<UserSourceWord, typeof Word.prototype.id>;

  public readonly sourceWords: HasManyRepositoryFactory<SourceWord, typeof Word.prototype.id>;

  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource, @repository.getter('UserWordRepository') protected userWordRepositoryGetter: Getter<UserWordRepository>, @repository.getter('UserSourceWordRepository') protected userSourceWordRepositoryGetter: Getter<UserSourceWordRepository>, @repository.getter('SourceWordRepository') protected sourceWordRepositoryGetter: Getter<SourceWordRepository>,
  ) {
    super(Word, dataSource);
    this.sourceWords = this.createHasManyRepositoryFactoryFor('sourceWords', sourceWordRepositoryGetter,);
    this.registerInclusionResolver('sourceWords', this.sourceWords.inclusionResolver);
    this.userSourceWords = this.createHasManyRepositoryFactoryFor('userSourceWords', userSourceWordRepositoryGetter,);
    this.registerInclusionResolver('userSourceWords', this.userSourceWords.inclusionResolver);
    this.userWords = this.createHasManyRepositoryFactoryFor('userWords', userWordRepositoryGetter,);
    this.registerInclusionResolver('userWords', this.userWords.inclusionResolver);
  }
}
