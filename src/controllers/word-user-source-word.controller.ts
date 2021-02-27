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
  UserSourceWord,
} from '../models';
import {WordRepository} from '../repositories';

export class WordUserSourceWordController {
  constructor(
    @repository(WordRepository) protected wordRepository: WordRepository,
  ) { }

  @get('/words/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Array of Word has many UserSourceWord',
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
    return this.wordRepository.userSourceWords(id).find(filter);
  }

  @post('/words/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Word model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserSourceWord)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Word.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSourceWord, {
            title: 'NewUserSourceWordInWord',
            exclude: ['id'],
            optional: ['wordId']
          }),
        },
      },
    }) userSourceWord: Omit<UserSourceWord, 'id'>,
  ): Promise<UserSourceWord> {
    return this.wordRepository.userSourceWords(id).create(userSourceWord);
  }

  @patch('/words/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Word.UserSourceWord PATCH success count',
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
    return this.wordRepository.userSourceWords(id).patch(userSourceWord, where);
  }

  @del('/words/{id}/user-source-words', {
    responses: {
      '200': {
        description: 'Word.UserSourceWord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserSourceWord)) where?: Where<UserSourceWord>,
  ): Promise<Count> {
    return this.wordRepository.userSourceWords(id).delete(where);
  }
}
