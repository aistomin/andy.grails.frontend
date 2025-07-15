import { Injectable } from '@angular/core';
import { ResourceNotFoundException, ServerException } from './api-exceptions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor() {}

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
        throw new ServerException(endpoint, response.status);
      }
      return await response.json();
    } catch (error) {
      console.error(`API GET request failed for ${endpoint}:`, error);
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
        throw new ServerException(endpoint, response.status);
      }

      return await response.json();
    } catch (error) {
      console.error(`API POST request failed for ${endpoint}:`, error);
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
        throw new ServerException(endpoint, response.status);
      }
      return await response.json();
    } catch (error) {
      console.error(`API PUT request failed for ${endpoint}:`, error);
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
        throw new ServerException(endpoint, response.status);
      }
      return await response.json();
    } catch (error) {
      console.error(`API DELETE request failed for ${endpoint}:`, error);
      throw error;
    }
  }
}
