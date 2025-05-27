import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, VideoCardComponent, FormsModule],
  providers: [VideoService],
  template: `
    <section>
      <form (submit)="filterResults(filter.value); $event.preventDefault()">
        <input
          type="text"
          placeholder="Filter by title and description"
          #filter
        />
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-video-card
        *ngFor="let video of filteredVideos"
        [video]="video"
      ></app-video-card>
    </section>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  videos: Video[] = [];

  filteredVideos: Video[] = [];

  constructor(private videoService: VideoService) {
    this.videoService.getAllVideos().then((list: Video[]) => {
      this.videos = list.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      this.filteredVideos = this.videos;
    });
  }

  filterResults(text: string) {
    if (!text) {
      console.log('No text, showing all videos');
      this.filteredVideos = this.videos;
    } else {
      const lowered = text.toLowerCase();
      console.log('Search for: ', lowered);
      const found = this.videos.filter(
        (video) =>
          video?.title.toLowerCase().includes(lowered) ||
          video?.description.toLowerCase().includes(lowered)
      );
      console.log('Found videos: ', found);
      this.filteredVideos = found;
    }
  }
}
