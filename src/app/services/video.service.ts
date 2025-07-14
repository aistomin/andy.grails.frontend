import { Injectable } from '@angular/core';
import { Video } from './video';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly api = 'videos';

  constructor(private apiService: ApiService) {}

  async getAllVideos(): Promise<Video[]> {
    return (await this.apiService.get<Video[]>(`/${this.api}`)) ?? [];
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    return (await this.apiService.get<Video>(`/${this.api}/${id}`)) ?? {};
  }
}
