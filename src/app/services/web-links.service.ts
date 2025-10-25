import { Injectable } from '@angular/core';
import { WebLink } from './web-link';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WebLinksService {
  constructor(private apiService: ApiService) {}

  async getWebLinks(): Promise<WebLink[]> {
    return (
      (await this.apiService.get<WebLink[]>('/configuration/web/links')) ?? []
    );
  }
}
