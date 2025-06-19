import { Injectable } from '@angular/core';
import { SocialMediaLink } from './social-media-link';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  readonly url = 'http://localhost:8080/configuration/social/media/links';

  constructor() {}

  async getSocialMediaLinks(): Promise<SocialMediaLink[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
