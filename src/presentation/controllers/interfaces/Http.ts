export interface HttpRequest {
  body?: any
  headers?: Record<string, string>
  params?: string
}

export interface HttpResponse {
  statusCode: number
  body: any
}
