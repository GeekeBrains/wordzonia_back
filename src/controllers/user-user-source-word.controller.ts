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
  UserSourceWord,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserSourceWordController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Array of User has many UserSourceWord',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserSourceWord)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserSourceWord>,
  ): Promise<UserSourceWord[]> {
    return this.userRepository.userSourceWords(id).find(filter);
  }

  @post('/users/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserSourceWord)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSourceWord, {
            title: 'NewUserSourceWordInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userSourceWord: Omit<UserSourceWord, 'id'>,
  ): Promise<UserSourceWord> {
    return this.userRepository.userSourceWords(id).create(userSourceWord);
  }

  @patch('/users/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'User.UserSourceWord PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSourceWord, {partial: true}),
        },
      },
    })
    userSourceWord: Partial<UserSourceWord>,
    @param.query.object('where', getWhereSchemaFor(UserSourceWord)) where?: Where<UserSourceWord>,
  ): Promise<Count> {
    return this.userRepository.userSourceWords(id).patch(userSourceWord, where);
  }

  @del('/users/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'User.UserSourceWord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserSourceWord)) where?: Where<UserSourceWord>,
  ): Promise<Count> {
    return this.userRepository.userSourceWords(id).delete(where);
  }
}
