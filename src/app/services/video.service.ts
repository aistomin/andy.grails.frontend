import { Injectable } from '@angular/core';
import { Video } from './video';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private apiService: ApiService) {}

  async getAllVideos(): Promise<Video[]> {
    return (await this.apiService.get<Video[]>('/videos')) ?? [];
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    return (await this.apiService.get<Video>(`/videos/${id}`)) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
