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
  UserSource,
} from '../models';
import {UserRepository} from '../repositories';

export class UserUserSourceController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/user-sources', {
    responses: {
      '200': {
        description: 'Array of User has many UserSource',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserSource)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserSource>,
  ): Promise<UserSource[]> {
    return this.userRepository.userSources(id).find(filter);
  }

  @post('/users/{id}/user-sources', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserSource)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSource, {
            title: 'NewUserSourceInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userSource: Omit<UserSource, 'id'>,
  ): Promise<UserSource> {
    return this.userRepository.userSources(id).create(userSource);
  }

  @patch('/users/{id}/user-sources', {
    responses: {
      '200': {
        description: 'User.UserSource PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSource, {partial: true}),
        },
      },
    })
    userSource: Partial<UserSource>,
    @param.query.object('where', getWhereSchemaFor(UserSource)) where?: Where<UserSource>,
  ): Promise<Count> {
    return this.userRepository.userSources(id).patch(userSource, where);
  }

  @del('/users/{id}/user-sources', {
    responses: {
      '200': {
        description: 'User.UserSource DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserSource)) where?: Where<UserSource>,
  ): Promise<Count> {
    return this.userRepository.userSources(id).delete(where);
  }
}
