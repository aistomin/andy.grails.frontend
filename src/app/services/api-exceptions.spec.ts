import {
  ApiException,
  ResourceNotFoundException,
  InternalServerException,
  ServerException,
} from './api-exceptions';

describe('ApiException', () => {
  it('should create ApiException with correct properties', () => {
    const exception = new ApiException('Test message', 400, '/test/endpoint');

    expect(exception.message).toBe('Test message');
    expect(exception.status).toBe(400);
    expect(exception.endpoint).toBe('/test/endpoint');
    expect(exception.name).toBe('ApiException');
  });

  it('should be instance of Error', () => {
    const exception = new ApiException('Test message', 400, '/test/endpoint');
    expect(exception).toBeInstanceOf(Error);
  });
});

describe('ResourceNotFoundException', () => {
  it('should create ResourceNotFoundException with correct properties', () => {
    const endpoint = '/api/videos/999';
    const exception = new ResourceNotFoundException(endpoint);

    expect(exception.message).toBe(`Resource not found: ${endpoint}`);
    expect(exception.status).toBe(404);
    expect(exception.endpoint).toBe(endpoint);
    expect(exception.name).toBe('ResourceNotFoundException');
  });

  it('should be instance of ApiException', () => {
    const exception = new ResourceNotFoundException('/test/endpoint');
    expect(exception).toBeInstanceOf(ApiException);
  });
});

describe('InternalServerException', () => {
  it('should create InternalServerException with correct properties', () => {
    const endpoint = '/test/error';
    const exception = new InternalServerException(endpoint);

    expect(exception.message).toBe(`Internal server error: ${endpoint}`);
    expect(exception.status).toBe(500);
    expect(exception.endpoint).toBe(endpoint);
    expect(exception.name).toBe('InternalServerException');
  });

  it('should be instance of ApiException', () => {
    const exception = new InternalServerException('/test/endpoint');
    expect(exception).toBeInstanceOf(ApiException);
  });
});

describe('ServerException', () => {
  it('should create ServerException with correct properties', () => {
    const endpoint = '/api/videos';
    const status = 400;
    const exception = new ServerException(endpoint, status);

    expect(exception.message).toBe(`Server error: ${status}`);
    expect(exception.status).toBe(status);
    expect(exception.endpoint).toBe(endpoint);
    expect(exception.name).toBe('ServerException');
  });

  it('should be instance of ApiException', () => {
    const exception = new ServerException('/test/endpoint', 400);
    expect(exception).toBeInstanceOf(ApiException);
  });

  it('should handle different status codes', () => {
    const endpoint = '/api/videos';
    const status = 403;
    const exception = new ServerException(endpoint, status);

    expect(exception.status).toBe(403);
    expect(exception.message).toBe('Server error: 403');
  });
});

describe('Exception inheritance', () => {
  it('should maintain proper inheritance chain', () => {
    const resourceException = new ResourceNotFoundException('/api/test');
    const serverException = new ServerException('/api/test', 500);

    // Both should inherit from ApiException
    expect(resourceException).toBeInstanceOf(ApiException);
    expect(serverException).toBeInstanceOf(ApiException);

    // Both should inherit from Error
    expect(resourceException).toBeInstanceOf(Error);
    expect(serverException).toBeInstanceOf(Error);

    // But they should not be instances of each other
    expect(resourceException).not.toBeInstanceOf(ServerException);
    expect(serverException).not.toBeInstanceOf(ResourceNotFoundException);
  });
});
