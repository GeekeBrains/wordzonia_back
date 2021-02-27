import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, UserWord, UserSource, UserSourceWord} from '../models';
import {WordzoniaDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserWordRepository} from './user-word.repository';
import {UserSourceRepository} from './user-source.repository';
import {UserSourceWordRepository} from './user-source-word.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userWords: HasManyRepositoryFactory<UserWord, typeof User.prototype.id>;

  public readonly userSources: HasManyRepositoryFactory<UserSource, typeof User.prototype.id>;

  public readonly userSourceWords: HasManyRepositoryFactory<UserSourceWord, typeof User.prototype.id>;

  constructor(
    @inject('datasources.wordzonia') dataSource: WordzoniaDataSource, @repository.getter('UserWordRepository') protected userWordRepositoryGetter: Getter<UserWordRepository>, @repository.getter('UserSourceRepository') protected userSourceRepositoryGetter: Getter<UserSourceRepository>, @repository.getter('UserSourceWordRepository') protected userSourceWordRepositoryGetter: Getter<UserSourceWordRepository>,
  ) {
    super(User, dataSource);
    this.userSourceWords = this.createHasManyRepositoryFactoryFor('userSourceWords', userSourceWordRepositoryGetter,);
    this.registerInclusionResolver('userSourceWords', this.userSourceWords.inclusionResolver);
    this.userSources = this.createHasManyRepositoryFactoryFor('userSources', userSourceRepositoryGetter,);
    this.registerInclusionResolver('userSources', this.userSources.inclusionResolver);
    this.userWords = this.createHasManyRepositoryFactoryFor('userWords', userWordRepositoryGetter,);
    this.registerInclusionResolver('userWords', this.userWords.inclusionResolver);
  }
}
