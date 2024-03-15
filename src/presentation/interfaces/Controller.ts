import { type HttpRequest, type HttpResponse } from './Http';

export interface Controller {
  handle (request: HttpRequest): Promise<HttpResponse>
}
