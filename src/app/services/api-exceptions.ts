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

/**
 * The backend could not be reached: the request itself failed (offline, DNS,
 * CORS, aborted) or a proxy in front of the backend answered 502/503/504.
 */
export class NetworkException extends ApiException {
  constructor(
    endpoint: string,
    message: string = 'Network error',
    status: number = 0
  ) {
    super(message, status, endpoint);
    this.name = 'NetworkException';
  }
}
