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
import {Source} from '../models';
import {SourceRepository} from '../repositories';
import {ScrapingService} from '../services';

export class SourcesController {
  constructor(
    @repository(SourceRepository)
    public sourceRepository: SourceRepository,
    @service(ScrapingService)
    public scrapingService: ScrapingService,
  ) {}

  @post('/sources', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {'application/json': {schema: getModelSchemaRef(Source)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Source, {
            title: 'NewSource',
          }),
        },
      },
    })
    source: Source,
  ): Promise<Source> {
    this.scrapingService.get(source.url);
    return source; //this.sourceRepository.create(source);
  }

  @get('/sources/count', {
    responses: {
      '200': {
        description: 'Source model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Source) where?: Where<Source>): Promise<Count> {
    return this.sourceRepository.count(where);
  }

  @get('/sources', {
    responses: {
      '200': {
        description: 'Array of Source model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Source, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Source) filter?: Filter<Source>): Promise<Source[]> {
    return this.sourceRepository.find(filter);
  }

  @patch('/sources', {
    responses: {
      '200': {
        description: 'Source PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Source, {partial: true}),
        },
      },
    })
    source: Source,
    @param.where(Source) where?: Where<Source>,
  ): Promise<Count> {
    return this.sourceRepository.updateAll(source, where);
  }

  @get('/sources/{id}', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Source, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Source, {exclude: 'where'})
    filter?: FilterExcludingWhere<Source>,
  ): Promise<Source> {
    return this.sourceRepository.findById(id, filter);
  }

  @patch('/sources/{id}', {
    responses: {
      '204': {
        description: 'Source PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Source, {partial: true}),
        },
      },
    })
    source: Source,
  ): Promise<void> {
    await this.sourceRepository.updateById(id, source);
  }

  @put('/sources/{id}', {
    responses: {
      '204': {
        description: 'Source PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() source: Source,
  ): Promise<void> {
    await this.sourceRepository.replaceById(id, source);
  }

  @del('/sources/{id}', {
    responses: {
      '204': {
        description: 'Source DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sourceRepository.deleteById(id);
  }
}
