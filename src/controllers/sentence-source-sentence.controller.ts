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
  Sentence,
  SourceSentence,
} from '../models';
import {SentenceRepository} from '../repositories';

export class SentenceSourceSentenceController {
  constructor(
    @repository(SentenceRepository) protected sentenceRepository: SentenceRepository,
  ) { }

  @get('/sentences/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Array of Sentence has many SourceSentence',
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
    return this.sentenceRepository.sourceSentences(id).find(filter);
  }

  @post('/sentences/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Sentence model instance',
        content: {'application/json': {schema: getModelSchemaRef(SourceSentence)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sentence.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourceSentence, {
            title: 'NewSourceSentenceInSentence',
            exclude: ['id'],
            optional: ['sentenceId']
          }),
        },
      },
    }) sourceSentence: Omit<SourceSentence, 'id'>,
  ): Promise<SourceSentence> {
    return this.sentenceRepository.sourceSentences(id).create(sourceSentence);
  }

  @patch('/sentences/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Sentence.SourceSentence PATCH success count',
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
    return this.sentenceRepository.sourceSentences(id).patch(sourceSentence, where);
  }

  @del('/sentences/{id}/source-sentences', {
    responses: {
      '200': {
        description: 'Sentence.SourceSentence DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SourceSentence)) where?: Where<SourceSentence>,
  ): Promise<Count> {
    return this.sentenceRepository.sourceSentences(id).delete(where);
  }
}
