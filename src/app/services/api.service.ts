import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ResourceNotFoundException,
  InternalServerException,
  ServerException,
  NetworkException,
} from './api-exceptions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private router: Router) {}

  /**
   * Handles 404 errors by navigating to the 404 page
   * @param error - The error that occurred
   */
  private handle404Error(error: any): void {
    if (error instanceof ResourceNotFoundException) {
      this.router.navigate(['/404']);
    }
  }

  /**
   * Handles 500 errors by navigating to the 500 error page
   * @param error - The error that occurred
   */
  private handle500Error(error: any): void {
    if (error instanceof InternalServerException) {
      this.router.navigate(['/500']);
    }
  }

  /**
   * Handles network errors (like backend being down) by navigating to the network error page
   * @param error - The error that occurred
   */
  private handleNetworkError(error: any, endpoint: string): void {
    if (error instanceof NetworkException) {
      this.router.navigate(['/network-error']);
    }
  }

  /**
   * Makes a GET request to the specified endpoint
   * @param endpoint - The API endpoint (without base URL)
   * @returns Promise with the response data
   */
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new ResourceNotFoundException(endpoint);
        }
        if (response.status === 500) {
          throw new InternalServerException(endpoint);
        }
        throw new ServerException(endpoint, response.status);
      }
      return await response.json();
    } catch (error: any) {
      if (
        error instanceof TypeError ||
        error.message?.includes('fetch') ||
        error.message?.toLowerCase().includes('network') ||
        error.message?.includes('Failed to fetch')
      ) {
        const networkError = new NetworkException(endpoint, error.message);
        this.handleNetworkError(networkError, endpoint);
        throw networkError;
      }
      console.error(`API GET request failed for ${endpoint}:`, error);
      this.handle404Error(error);
      this.handle500Error(error);
      throw error;
    }
  }

  /**
   * Makes a POST request to the specified endpoint
   * @param endpoint - The API endpoint (without base URL)
   * @param data - The data to send in the request body
   * @returns Promise with the response data
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new ResourceNotFoundException(endpoint);
        }
        if (response.status === 500) {
          throw new InternalServerException(endpoint);
        }
        throw new ServerException(endpoint, response.status);
      }

      return await response.json();
    } catch (error: any) {
      if (
        error instanceof TypeError ||
        error.message?.includes('fetch') ||
        error.message?.toLowerCase().includes('network') ||
        error.message?.includes('Failed to fetch')
      ) {
        const networkError = new NetworkException(endpoint, error.message);
        this.handleNetworkError(networkError, endpoint);
        throw networkError;
      }
      console.error(`API POST request failed for ${endpoint}:`, error);
      this.handle404Error(error);
      this.handle500Error(error);
      throw error;
    }
  }

  /**
   * Makes a PUT request to the specified endpoint
   * @param endpoint - The API endpoint (without base URL)
   * @param data - The data to send in the request body
   * @returns Promise with the response data
   */
  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new ResourceNotFoundException(endpoint);
        }
        if (response.status === 500) {
          throw new InternalServerException(endpoint);
        }
        throw new ServerException(endpoint, response.status);
      }
      return await response.json();
    } catch (error: any) {
      if (
        error instanceof TypeError ||
        error.message?.includes('fetch') ||
        error.message?.toLowerCase().includes('network') ||
        error.message?.includes('Failed to fetch')
      ) {
        const networkError = new NetworkException(endpoint, error.message);
        this.handleNetworkError(networkError, endpoint);
        throw networkError;
      }
      console.error(`API PUT request failed for ${endpoint}:`, error);
      this.handle404Error(error);
      this.handle500Error(error);
      throw error;
    }
  }

  /**
   * Makes a DELETE request to the specified endpoint
   * @param endpoint - The API endpoint (without base URL)
   * @returns Promise with the response data
   */
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new ResourceNotFoundException(endpoint);
        }
        if (response.status === 500) {
          throw new InternalServerException(endpoint);
        }
        throw new ServerException(endpoint, response.status);
      }
      return await response.json();
    } catch (error: any) {
      if (
        error instanceof TypeError ||
        error.message?.includes('fetch') ||
        error.message?.toLowerCase().includes('network') ||
        error.message?.includes('Failed to fetch')
      ) {
        const networkError = new NetworkException(endpoint, error.message);
        this.handleNetworkError(networkError, endpoint);
        throw networkError;
      }
      console.error(`API DELETE request failed for ${endpoint}:`, error);
      this.handle404Error(error);
      this.handle500Error(error);
      throw error;
    }
  }
}
