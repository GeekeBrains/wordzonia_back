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
  UserSourceWord,
} from '../models';
import {SourceRepository} from '../repositories';

export class SourceUserSourceWordController {
  constructor(
    @repository(SourceRepository) protected sourceRepository: SourceRepository,
  ) { }

  @get('/sources/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Array of Source has many UserSourceWord',
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
    return this.sourceRepository.userSourceWords(id).find(filter);
  }

  @post('/sources/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserSourceWord)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Source.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSourceWord, {
            title: 'NewUserSourceWordInSource',
            exclude: ['id'],
            optional: ['sourceId']
          }),
        },
      },
    }) userSourceWord: Omit<UserSourceWord, 'id'>,
  ): Promise<UserSourceWord> {
    return this.sourceRepository.userSourceWords(id).create(userSourceWord);
  }

  @patch('/sources/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Source.UserSourceWord PATCH success count',
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
    return this.sourceRepository.userSourceWords(id).patch(userSourceWord, where);
  }

  @del('/sources/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Source.UserSourceWord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserSourceWord)) where?: Where<UserSourceWord>,
  ): Promise<Count> {
    return this.sourceRepository.userSourceWords(id).delete(where);
  }
}
