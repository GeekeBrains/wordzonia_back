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
  UserWord,
} from '../models';
import {WordRepository} from '../repositories';

export class WordUserWordController {
  constructor(
    @repository(WordRepository) protected wordRepository: WordRepository,
  ) { }

  @get('/words/{id}/user-words', {
    responses: {
      '200': {
        description: 'Array of Word has many UserWord',
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
    return this.wordRepository.userWords(id).find(filter);
  }

  @post('/words/{id}/user-words', {
    responses: {
      '200': {
        description: 'Word model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserWord)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Word.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserWord, {
            title: 'NewUserWordInWord',
            exclude: ['id'],
            optional: ['wordId']
          }),
        },
      },
    }) userWord: Omit<UserWord, 'id'>,
  ): Promise<UserWord> {
    return this.wordRepository.userWords(id).create(userWord);
  }

  @patch('/words/{id}/user-words', {
    responses: {
      '200': {
        description: 'Word.UserWord PATCH success count',
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
    return this.wordRepository.userWords(id).patch(userWord, where);
  }

  @del('/words/{id}/user-words', {
    responses: {
      '200': {
        description: 'Word.UserWord DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserWord)) where?: Where<UserWord>,
  ): Promise<Count> {
    return this.wordRepository.userWords(id).delete(where);
  }
}
