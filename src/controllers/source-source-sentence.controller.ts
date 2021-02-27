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
  SourceSentence,
} from '../models';
import {SourceRepository} from '../repositories';

export class SourceSourceSentenceController {
  constructor(
    @repository(SourceRepository) protected sourceRepository: SourceRepository,
  ) { }

  @get('/sources/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Array of Source has many SourceSentence',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SourceSentence)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SourceSentence>,
  ): Promise<SourceSentence[]> {
    return this.sourceRepository.sourceSentences(id).find(filter);
  }

  @post('/sources/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {'application/json': {schema: getModelSchemaRef(SourceSentence)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Source.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourceSentence, {
            title: 'NewSourceSentenceInSource',
            exclude: ['id'],
            optional: ['sourceId']
          }),
        },
      },
    }) sourceSentence: Omit<SourceSentence, 'id'>,
  ): Promise<SourceSentence> {
    return this.sourceRepository.sourceSentences(id).create(sourceSentence);
  }

  @patch('/sources/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Source.SourceSentence PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourceSentence, {partial: true}),
        },
      },
    })
    sourceSentence: Partial<SourceSentence>,
    @param.query.object('where', getWhereSchemaFor(SourceSentence)) where?: Where<SourceSentence>,
  ): Promise<Count> {
    return this.sourceRepository.sourceSentences(id).patch(sourceSentence, where);
  }

  @del('/sources/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Source.SourceSentence DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SourceSentence)) where?: Where<SourceSentence>,
  ): Promise<Count> {
    return this.sourceRepository.sourceSentences(id).delete(where);
  }
}
