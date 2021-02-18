import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Word} from '../models';
import {WordRepository} from '../repositories';

export class WordsController {
  constructor(
    @repository(WordRepository)
    public wordRepository : WordRepository,
  ) {}

  @post('/words', {
    responses: {
      '200': {
        description: 'Word model instance',
        content: {'application/json': {schema: getModelSchemaRef(Word)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Word, {
            title: 'NewWord',
            
          }),
        },
      },
    })
    word: Word,
  ): Promise<Word> {
    return this.wordRepository.create(word);
  }

  @get('/words/count', {
    responses: {
      '200': {
        description: 'Word model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Word) where?: Where<Word>,
  ): Promise<Count> {
    return this.wordRepository.count(where);
  }

  @get('/words', {
    responses: {
      '200': {
        description: 'Array of Word model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Word, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Word) filter?: Filter<Word>,
  ): Promise<Word[]> {
    return this.wordRepository.find(filter);
  }

  @patch('/words', {
    responses: {
      '200': {
        description: 'Word PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Word, {partial: true}),
        },
      },
    })
    word: Word,
    @param.where(Word) where?: Where<Word>,
  ): Promise<Count> {
    return this.wordRepository.updateAll(word, where);
  }

  @get('/words/{id}', {
    responses: {
      '200': {
        description: 'Word model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Word, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Word, {exclude: 'where'}) filter?: FilterExcludingWhere<Word>
  ): Promise<Word> {
    return this.wordRepository.findById(id, filter);
  }

  @patch('/words/{id}', {
    responses: {
      '204': {
        description: 'Word PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Word, {partial: true}),
        },
      },
    })
    word: Word,
  ): Promise<void> {
    await this.wordRepository.updateById(id, word);
  }

  @put('/words/{id}', {
    responses: {
      '204': {
        description: 'Word PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() word: Word,
  ): Promise<void> {
    await this.wordRepository.replaceById(id, word);
  }

  @del('/words/{id}', {
    responses: {
      '204': {
        description: 'Word DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wordRepository.deleteById(id);
  }
}
