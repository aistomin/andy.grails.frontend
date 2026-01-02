import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import {
  ResourceNotFoundException,
  InternalServerException,
  ServerException,
  NetworkException,
} from './api-exceptions';

// Helper to create a mock Response object
function createMockResponse(body: string, init: ResponseInit): Response {
  return {
    ok: init.status !== undefined && init.status >= 200 && init.status < 300,
    status: init.status || 200,
    statusText: init.statusText || '',
    headers: new Headers(init.headers),
    json: () => Promise.resolve(JSON.parse(body)),
    text: () => Promise.resolve(body),
    clone: function () {
      return this;
    },
  } as Response;
}

describe('ApiService', () => {
  let service: ApiService;
  let router: jest.Mocked<Router>;
  let originalSessionStorage: Storage;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    const routerSpy = {
      navigate: jest.fn(),
    };

    // Mock fetch globally
    mockFetch = jest.fn();
    global.fetch = mockFetch;

    // Mock sessionStorage
    originalSessionStorage = window.sessionStorage;
    const mockSessionStorage: Storage = {
      length: 0,
      clear: jest.fn(),
      getItem: jest.fn(),
      key: jest.fn(),
      removeItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: Router, useValue: routerSpy }],
    });

    service = TestBed.inject(ApiService);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET requests', () => {
    it('should handle 404 errors by navigating to 404 page', async () => {
      const endpoint = '/api/videos/999';
      const mockResponse = createMockResponse('Not Found', { status: 404 });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.get(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should handle 500 errors by navigating to 500 page', async () => {
      const endpoint = '/test/error';
      const mockResponse = createMockResponse('Internal Server Error', {
        status: 500,
      });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.get(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/500']);
    });

    it('should throw ResourceNotFoundException for 404 errors', async () => {
      const endpoint = '/api/videos/999';
      const mockResponse = createMockResponse('Not Found', { status: 404 });

      mockFetch.mockResolvedValue(mockResponse);

      await expect(service.get(endpoint)).rejects.toBeInstanceOf(
        ResourceNotFoundException
      );
    });

    it('should throw InternalServerException for 500 errors', async () => {
      const endpoint = '/test/error';
      const mockResponse = createMockResponse('Internal Server Error', {
        status: 500,
      });

      mockFetch.mockResolvedValue(mockResponse);

      await expect(service.get(endpoint)).rejects.toBeInstanceOf(
        InternalServerException
      );
    });

    it('should throw ServerException for other HTTP errors', async () => {
      const endpoint = '/api/videos';
      const mockResponse = createMockResponse('Bad Request', { status: 400 });

      mockFetch.mockResolvedValue(mockResponse);

      await expect(service.get(endpoint)).rejects.toBeInstanceOf(ServerException);
    });

    it('should return data for successful requests', async () => {
      const endpoint = '/api/videos/1';
      const mockData = { id: 1, title: 'Test Video' };
      const mockResponse = createMockResponse(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

      mockFetch.mockResolvedValue(mockResponse);

      const result = await service.get(endpoint);

      expect(result).toEqual(mockData);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('POST requests', () => {
    it('should handle 404 errors by navigating to 404 page', async () => {
      const endpoint = '/api/videos';
      const data = { title: 'Test Video' };
      const mockResponse = createMockResponse('Not Found', { status: 404 });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.post(endpoint, data);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should handle 500 errors by navigating to 500 page', async () => {
      const endpoint = '/test/error';
      const data = { test: 'data' };
      const mockResponse = createMockResponse('Internal Server Error', {
        status: 500,
      });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.post(endpoint, data);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/500']);
    });

    it('should make POST request with correct parameters', async () => {
      const endpoint = '/api/videos';
      const data = { title: 'Test Video' };
      const mockData = { id: 1, title: 'Test Video' };
      const mockResponse = createMockResponse(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

      mockFetch.mockResolvedValue(mockResponse);

      await service.post(endpoint, data);

      // The base URL from environment.ts is '/api', so the full URL is '/api/api/videos'
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/api/videos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
    });
  });

  describe('PUT requests', () => {
    it('should handle 404 errors by navigating to 404 page', async () => {
      const endpoint = '/api/videos/1';
      const data = { title: 'Updated Video' };
      const mockResponse = createMockResponse('Not Found', { status: 404 });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.put(endpoint, data);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should handle 500 errors by navigating to 500 page', async () => {
      const endpoint = '/test/error';
      const data = { test: 'data' };
      const mockResponse = createMockResponse('Internal Server Error', {
        status: 500,
      });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.put(endpoint, data);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/500']);
    });
  });

  describe('DELETE requests', () => {
    it('should handle 404 errors by navigating to 404 page', async () => {
      const endpoint = '/api/videos/999';
      const mockResponse = createMockResponse('Not Found', { status: 404 });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.delete(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should handle 500 errors by navigating to 500 page', async () => {
      const endpoint = '/test/error';
      const mockResponse = createMockResponse('Internal Server Error', {
        status: 500,
      });

      mockFetch.mockResolvedValue(mockResponse);

      try {
        await service.delete(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/500']);
    });
  });

  describe('Network errors', () => {
    it('should throw NetworkException and navigate to network/error for network errors', async () => {
      const endpoint = '/api/videos';
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      await expect(service.get(endpoint)).rejects.toBeInstanceOf(NetworkException);
      expect(router.navigate).toHaveBeenCalledWith(['/network/error']);
    });

    it('should throw NetworkException for TypeError network errors', async () => {
      const endpoint = '/api/videos';
      mockFetch.mockRejectedValue(new TypeError('fetch failed'));

      await expect(service.get(endpoint)).rejects.toBeInstanceOf(NetworkException);
      expect(router.navigate).toHaveBeenCalledWith(['/network/error']);
    });

    it('should throw NetworkException for generic network errors', async () => {
      const endpoint = '/api/videos';
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(service.get(endpoint)).rejects.toBeInstanceOf(NetworkException);
      expect(router.navigate).toHaveBeenCalledWith(['/network/error']);
    });

    it('should handle network errors in POST requests', async () => {
      const endpoint = '/api/videos';
      const data = { title: 'Test Video' };
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      await expect(service.post(endpoint, data)).rejects.toBeInstanceOf(
        NetworkException
      );
      expect(router.navigate).toHaveBeenCalledWith(['/network/error']);
    });

    it('should handle network errors in PUT requests', async () => {
      const endpoint = '/api/videos/1';
      const data = { title: 'Updated Video' };
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      await expect(service.put(endpoint, data)).rejects.toBeInstanceOf(
        NetworkException
      );
      expect(router.navigate).toHaveBeenCalledWith(['/network/error']);
    });

    it('should handle network errors in DELETE requests', async () => {
      const endpoint = '/api/videos/1';
      mockFetch.mockRejectedValue(new Error('Failed to fetch'));

      await expect(service.delete(endpoint)).rejects.toBeInstanceOf(
        NetworkException
      );
      expect(router.navigate).toHaveBeenCalledWith(['/network/error']);
    });
  });
});
