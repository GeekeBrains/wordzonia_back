import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Parsing} from '../models';
import {ParsingRepository} from '../repositories';
import {ParsingService, WordService} from '../services';

export class ParsingsController {
  constructor(
    @repository(ParsingRepository)
    public parsingRepository: ParsingRepository,
    @service(WordService)
    private wordService: WordService,
    @service(ParsingService)
    private parsingService: ParsingService,
  ) {}

  @post('/parsings', {
    responses: {
      '200': {
        description: 'Parsing model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parsing)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parsing, {
            title: 'NewParsing',
            exclude: ['id'],
          }),
        },
      },
    })
    parsing: Omit<Parsing, 'id'>,
  ): Promise<Parsing> {
    return this.parsingRepository.create(parsing);
  }

  @get('/parsings/count', {
    responses: {
      '200': {
        description: 'Parsing model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Parsing) where?: Where<Parsing>): Promise<Count> {
    return this.parsingRepository.count(where);
  }

  @get('/parsings', {
    responses: {
      '200': {
        description: 'Array of Parsing model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Parsing, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Parsing) filter?: Filter<Parsing>,
  ): Promise<Parsing[]> {
    return this.parsingRepository.find(filter);
  }

  @patch('/parsings', {
    responses: {
      '200': {
        description: 'Parsing PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parsing, {partial: true}),
        },
      },
    })
    parsing: Parsing,
    @param.where(Parsing) where?: Where<Parsing>,
  ): Promise<Count> {
    return this.parsingRepository.updateAll(parsing, where);
  }

  @get('/parsings/{id}', {
    responses: {
      '200': {
        description: 'Parsing model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parsing, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parsing, {exclude: 'where'})
    filter?: FilterExcludingWhere<Parsing>,
  ): Promise<Parsing> {
    return this.parsingRepository.findById(id, filter);
  }

  @patch('/parsings/{id}', {
    responses: {
      '204': {
        description: 'Parsing PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parsing, {partial: true}),
        },
      },
    })
    parsing: Parsing,
  ): Promise<void> {
    await this.parsingRepository.updateById(id, parsing);
  }

  @put('/parsings/{id}', {
    responses: {
      '204': {
        description: 'Parsing PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parsing: Parsing,
  ): Promise<void> {
    await this.parsingRepository.replaceById(id, parsing);
  }

  @del('/parsings/{id}', {
    responses: {
      '204': {
        description: 'Parsing DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parsingRepository.deleteById(id);
  }

  @get('/test', {
    responses: {
      '200': {
        description: 'Parsing model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parsing, {includeRelations: true}),
          },
        },
      },
    },
  })
  async test(): Promise<Object> {
    return {
      resp: await this.parsingService.parse(
        'The angry bear chased the frightened little squirrel.',
      ),
    };
  }
}
