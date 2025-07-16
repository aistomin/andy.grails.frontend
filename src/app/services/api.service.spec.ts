import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import {
  ResourceNotFoundException,
  InternalServerException,
  ServerException,
  NetworkException,
} from './api-exceptions';

describe('ApiService', () => {
  let service: ApiService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: Router, useValue: routerSpy }],
    });

    service = TestBed.inject(ApiService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET requests', () => {
    it('should handle 404 errors by navigating to 404 page', async () => {
      const endpoint = '/api/videos/999';
      const mockResponse = new Response('Not Found', { status: 404 });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      try {
        await service.get(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should handle 500 errors by navigating to 500 page', async () => {
      const endpoint = '/test/error';
      const mockResponse = new Response('Internal Server Error', {
        status: 500,
      });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      try {
        await service.get(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/500']);
    });

    it('should throw ResourceNotFoundException for 404 errors', async () => {
      const endpoint = '/api/videos/999';
      const mockResponse = new Response('Not Found', { status: 404 });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      try {
        await service.get(endpoint);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(ResourceNotFoundException);
        if (error instanceof ResourceNotFoundException) {
          expect(error.status).toBe(404);
          expect(error.endpoint).toBe(endpoint);
        }
      }
    });

    it('should throw InternalServerException for 500 errors', async () => {
      const endpoint = '/test/error';
      const mockResponse = new Response('Internal Server Error', {
        status: 500,
      });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      try {
        await service.get(endpoint);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerException);
        if (error instanceof InternalServerException) {
          expect(error.status).toBe(500);
          expect(error.endpoint).toBe(endpoint);
        }
      }
    });

    it('should throw ServerException for other HTTP errors', async () => {
      const endpoint = '/api/videos';
      const mockResponse = new Response('Bad Request', { status: 400 });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      try {
        await service.get(endpoint);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        if (error instanceof ServerException) {
          expect(error.status).toBe(400);
          expect(error.endpoint).toBe(endpoint);
        }
      }
    });

    it('should return data for successful requests', async () => {
      const endpoint = '/api/videos/1';
      const mockData = { id: 1, title: 'Test Video' };
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      const result = await service.get(endpoint);

      expect(result).toEqual(mockData);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('POST requests', () => {
    it('should handle 404 errors by navigating to 404 page', async () => {
      const endpoint = '/api/videos';
      const data = { title: 'Test Video' };
      const mockResponse = new Response('Not Found', { status: 404 });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

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
      const mockResponse = new Response('Internal Server Error', {
        status: 500,
      });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

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
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(mockResponse)
      );

      await service.post(endpoint, data);

      expect(fetchSpy).toHaveBeenCalledWith(
        'http://localhost:8080/api/videos',
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
      const mockResponse = new Response('Not Found', { status: 404 });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

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
      const mockResponse = new Response('Internal Server Error', {
        status: 500,
      });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

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
      const mockResponse = new Response('Not Found', { status: 404 });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      try {
        await service.delete(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/404']);
    });

    it('should handle 500 errors by navigating to 500 page', async () => {
      const endpoint = '/test/error';
      const mockResponse = new Response('Internal Server Error', {
        status: 500,
      });

      spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

      try {
        await service.delete(endpoint);
      } catch (error) {
        // Expected to throw
      }

      expect(router.navigate).toHaveBeenCalledWith(['/500']);
    });
  });

  describe('Network errors', () => {
    beforeEach(() => {
      spyOn(sessionStorage, 'setItem');
      spyOn(sessionStorage, 'getItem');
      spyOn(sessionStorage, 'removeItem');
    });

    it('should throw NetworkException and navigate to network-error for network errors', async () => {
      const endpoint = '/api/videos';
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new Error('Failed to fetch'))
      );
      try {
        await service.get(endpoint);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkException);
        expect(router.navigate).toHaveBeenCalledWith(['/network-error']);
      }
    });

    it('should throw NetworkException for TypeError network errors', async () => {
      const endpoint = '/api/videos';
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new TypeError('fetch failed'))
      );
      try {
        await service.get(endpoint);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkException);
        expect(router.navigate).toHaveBeenCalledWith(['/network-error']);
      }
    });

    it('should throw NetworkException for generic network errors', async () => {
      const endpoint = '/api/videos';
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new Error('Network error'))
      );
      try {
        await service.get(endpoint);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkException);
        expect(router.navigate).toHaveBeenCalledWith(['/network-error']);
      }
    });

    it('should handle network errors in POST requests', async () => {
      const endpoint = '/api/videos';
      const data = { title: 'Test Video' };
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new Error('Failed to fetch'))
      );
      try {
        await service.post(endpoint, data);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkException);
        expect(router.navigate).toHaveBeenCalledWith(['/network-error']);
      }
    });

    it('should handle network errors in PUT requests', async () => {
      const endpoint = '/api/videos/1';
      const data = { title: 'Updated Video' };
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new Error('Failed to fetch'))
      );
      try {
        await service.put(endpoint, data);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkException);
        expect(router.navigate).toHaveBeenCalledWith(['/network-error']);
      }
    });

    it('should handle network errors in DELETE requests', async () => {
      const endpoint = '/api/videos/1';
      spyOn(window, 'fetch').and.returnValue(
        Promise.reject(new Error('Failed to fetch'))
      );
      try {
        await service.delete(endpoint);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkException);
        expect(router.navigate).toHaveBeenCalledWith(['/network-error']);
      }
    });
  });
});
