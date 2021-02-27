import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  UserWord,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserWordController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-words', {
    responses: {
      '200': {
        description: 'Array of User has many UserWord',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserWord)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserWord>,
  ): Promise<UserWord[]> {
    return this.userRepository.userWords(id).find(filter);
  }

  @post('/users/{id}/user-words', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserWord)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserWord, {
            title: 'NewUserWordInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userWord: Omit<UserWord, 'id'>,
  ): Promise<UserWord> {
    return this.userRepository.userWords(id).create(userWord);
  }

  @patch('/users/{id}/user-words', {
    responses: {
      '200': {
        description: 'User.UserWord PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserWord, {partial: true}),
        },
      },
    })
    userWord: Partial<UserWord>,
    @param.query.object('where', getWhereSchemaFor(UserWord)) where?: Where<UserWord>,
  ): Promise<Count> {
    return this.userRepository.userWords(id).patch(userWord, where);
  }

  @del('/users/{id}/user-words', {
    responses: {
      '200': {
        description: 'User.UserWord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserWord)) where?: Where<UserWord>,
  ): Promise<Count> {
    return this.userRepository.userWords(id).delete(where);
  }
}
