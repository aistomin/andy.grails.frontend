import {
  ApiException,
  ResourceNotFoundException,
  ServerException,
} from './api-exceptions';

describe('ApiException', () => {
  it('should create ApiException with correct properties', () => {
    const message = 'Test error message';
    const status = 500;
    const endpoint = '/api/test';

    const exception = new ApiException(message, status, endpoint);

    expect(exception.message).toBe(message);
    expect(exception.status).toBe(status);
    expect(exception.endpoint).toBe(endpoint);
    expect(exception.name).toBe('ApiException');
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
    expect(exception).toBeInstanceOf(ApiException);
    expect(exception).toBeInstanceOf(Error);
  });

  it('should have correct error message format', () => {
    const endpoint = '/api/users/123';
    const exception = new ResourceNotFoundException(endpoint);

    expect(exception.message).toBe('Resource not found: /api/users/123');
  });
});

describe('ServerException', () => {
  it('should create ServerException with correct properties', () => {
    const endpoint = '/api/videos';
    const status = 500;

    const exception = new ServerException(endpoint, status);

    expect(exception.message).toBe(`Server error: ${status}`);
    expect(exception.status).toBe(status);
    expect(exception.endpoint).toBe(endpoint);
    expect(exception.name).toBe('ServerException');
    expect(exception).toBeInstanceOf(ApiException);
    expect(exception).toBeInstanceOf(Error);
  });

  it('should handle different HTTP status codes', () => {
    const endpoint = '/api/videos';
    const statusCodes = [400, 401, 403, 500, 502, 503];

    statusCodes.forEach((status) => {
      const exception = new ServerException(endpoint, status);
      expect(exception.status).toBe(status);
      expect(exception.message).toBe(`Server error: ${status}`);
    });
  });

  it('should have correct error message format', () => {
    const endpoint = '/api/users';
    const status = 502;
    const exception = new ServerException(endpoint, status);

    expect(exception.message).toBe('Server error: 502');
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
