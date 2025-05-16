import { Injectable } from '@angular/core';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  readonly url = 'http://localhost:8080/videos';

  constructor() { }

  async getAllVideos(): Promise<Video[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
