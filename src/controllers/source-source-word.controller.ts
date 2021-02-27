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
  SourceWord,
} from '../models';
import {SourceRepository} from '../repositories';

export class SourceSourceWordController {
  constructor(
    @repository(SourceRepository) protected sourceRepository: SourceRepository,
  ) { }

  @get('/sources/{id}/source-words', {
    responses: {
      '200': {
        description: 'Array of Source has many SourceWord',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SourceWord)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SourceWord>,
  ): Promise<SourceWord[]> {
    return this.sourceRepository.sourceWords(id).find(filter);
  }

  @post('/sources/{id}/source-words', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {'application/json': {schema: getModelSchemaRef(SourceWord)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Source.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourceWord, {
            title: 'NewSourceWordInSource',
            exclude: ['id'],
            optional: ['sourceId']
          }),
        },
      },
    }) sourceWord: Omit<SourceWord, 'id'>,
  ): Promise<SourceWord> {
    return this.sourceRepository.sourceWords(id).create(sourceWord);
  }

  @patch('/sources/{id}/source-words', {
    responses: {
      '200': {
        description: 'Source.SourceWord PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourceWord, {partial: true}),
        },
      },
    })
    sourceWord: Partial<SourceWord>,
    @param.query.object('where', getWhereSchemaFor(SourceWord)) where?: Where<SourceWord>,
  ): Promise<Count> {
    return this.sourceRepository.sourceWords(id).patch(sourceWord, where);
  }

  @del('/sources/{id}/source-words', {
    responses: {
      '200': {
        description: 'Source.SourceWord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SourceWord)) where?: Where<SourceWord>,
  ): Promise<Count> {
    return this.sourceRepository.sourceWords(id).delete(where);
  }
}
