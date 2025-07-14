import { Injectable } from '@angular/core';
import { SocialMediaLink } from './social-media-link';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  constructor(private apiService: ApiService) {}

  async getSocialMediaLinks(): Promise<SocialMediaLink[]> {
    return (
      (await this.apiService.get<SocialMediaLink[]>(
        '/configuration/social/media/links'
      )) ?? []
    );
  }
}
