import { type IncomingHttpHeaders } from 'http2';

export interface HttpRequest {
  body?: any
  headers?: IncomingHttpHeaders
  params?: Record<string, string>
}

export interface HttpResponse {
  statusCode: number
  body: any
}
