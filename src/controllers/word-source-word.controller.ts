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
  Word,
  SourceWord,
} from '../models';
import {WordRepository} from '../repositories';

export class WordSourceWordController {
  constructor(
    @repository(WordRepository) protected wordRepository: WordRepository,
  ) { }

  @get('/words/{id}/source-words', {
    responses: {
      '200': {
        description: 'Array of Word has many SourceWord',
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
    return this.wordRepository.sourceWords(id).find(filter);
  }

  @post('/words/{id}/source-words', {
    responses: {
      '200': {
        description: 'Word model instance',
        content: {'application/json': {schema: getModelSchemaRef(SourceWord)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Word.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SourceWord, {
            title: 'NewSourceWordInWord',
            exclude: ['id'],
            optional: ['wordId']
          }),
        },
      },
    }) sourceWord: Omit<SourceWord, 'id'>,
  ): Promise<SourceWord> {
    return this.wordRepository.sourceWords(id).create(sourceWord);
  }

  @patch('/words/{id}/source-words', {
    responses: {
      '200': {
        description: 'Word.SourceWord PATCH success count',
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
    return this.wordRepository.sourceWords(id).patch(sourceWord, where);
  }

  @del('/words/{id}/source-words', {
    responses: {
      '200': {
        description: 'Word.SourceWord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SourceWord)) where?: Where<SourceWord>,
  ): Promise<Count> {
    return this.wordRepository.sourceWords(id).delete(where);
  }
}
