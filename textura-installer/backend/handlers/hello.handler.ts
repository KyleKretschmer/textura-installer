export interface HelloRequest {
  name: string
}

export interface HelloResponse {
  message: string
}

export function helloHandler(req: HelloRequest): HelloResponse {
  if (!req.name || typeof req.name !== 'string') {
    throw new Error('name is required')
  }
  return { message: `Hello, ${req.name}!` }
}

export function statusHandler(): { status: string } {
  return { status: 'mock backend running — ready for install steps' }
}