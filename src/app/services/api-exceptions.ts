export class ApiException extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = 'ApiException';
  }
}

export class ResourceNotFoundException extends ApiException {
  constructor(endpoint: string) {
    super(`Resource not found: ${endpoint}`, 404, endpoint);
    this.name = 'ResourceNotFoundException';
  }
}

export class InternalServerException extends ApiException {
  constructor(endpoint: string) {
    super(`Internal server error: ${endpoint}`, 500, endpoint);
    this.name = 'InternalServerException';
  }
}

export class ServerException extends ApiException {
  constructor(endpoint: string, status: number) {
    super(`Server error: ${status}`, status, endpoint);
    this.name = 'ServerException';
  }
}
