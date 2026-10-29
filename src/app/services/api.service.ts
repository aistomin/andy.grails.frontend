import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  ApiException,
  ResourceNotFoundException,
  InternalServerException,
  ServerException,
  NetworkException,
} from './api-exceptions';

const UNREACHABLE_STATUSES = [502, 503, 504];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private router: Router) {}

  /**
   * Makes a GET request to the specified endpoint.
   *
   * Every failure is turned into an ApiException and the user is sent to the
   * matching error page before the exception is rethrown, so callers never
   * need to navigate themselves.
   *
   * @param endpoint - The API endpoint (without base URL)
   * @returns Promise with the response data
   */
  async get<T>(endpoint: string): Promise<T> {
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${endpoint}`);
    } catch (error: any) {
      throw this.fail(new NetworkException(endpoint, error?.message));
    }
    if (!response.ok) {
      throw this.fail(this.toException(endpoint, response.status));
    }
    return await response.json();
  }

  private toException(endpoint: string, status: number): ApiException {
    if (status === 404) {
      return new ResourceNotFoundException(endpoint);
    }
    if (status === 500) {
      return new InternalServerException(endpoint);
    }
    if (UNREACHABLE_STATUSES.includes(status)) {
      return new NetworkException(
        endpoint,
        `Server unavailable: ${status}`,
        status
      );
    }
    return new ServerException(endpoint, status);
  }

  private fail(error: ApiException): ApiException {
    console.error(`API GET request failed for ${error.endpoint}:`, error);
    this.router.navigate([this.errorPage(error)]);
    return error;
  }

  private errorPage(error: ApiException): string {
    if (error instanceof ResourceNotFoundException) {
      return '/404';
    }
    if (error instanceof NetworkException) {
      return '/network/error';
    }
    return '/500';
  }
}
