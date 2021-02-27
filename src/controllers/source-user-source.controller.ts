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
  Source,
  UserSource,
} from '../models';
import {SourceRepository} from '../repositories';

export class SourceUserSourceController {
  constructor(
    @repository(SourceRepository) protected sourceRepository: SourceRepository,
  ) { }

  @get('/sources/{id}/user-sources', {
    responses: {
      '200': {
        description: 'Array of Source has many UserSource',
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
    return this.sourceRepository.userSources(id).find(filter);
  }

  @post('/sources/{id}/user-sources', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserSource)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Source.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSource, {
            title: 'NewUserSourceInSource',
            exclude: ['id'],
            optional: ['sourceId']
          }),
        },
      },
    }) userSource: Omit<UserSource, 'id'>,
  ): Promise<UserSource> {
    return this.sourceRepository.userSources(id).create(userSource);
  }

  @patch('/sources/{id}/user-sources', {
    responses: {
      '200': {
        description: 'Source.UserSource PATCH success count',
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
    return this.sourceRepository.userSources(id).patch(userSource, where);
  }

  @del('/sources/{id}/user-sources', {
    responses: {
      '200': {
        description: 'Source.UserSource DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserSource)) where?: Where<UserSource>,
  ): Promise<Count> {
    return this.sourceRepository.userSources(id).delete(where);
  }
}
