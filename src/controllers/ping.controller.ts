import {inject, service} from '@loopback/core';
import {get, Request, ResponseObject, RestBindings} from '@loopback/rest';
import {WordService} from '../services';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @service(WordService)
    private wordService: WordService,
  ) {}

  // Map to `GET /ping`
  @get('/ping2', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    return this.wordService.addWord('Hello');
  }
}
