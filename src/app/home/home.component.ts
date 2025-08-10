import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../services/video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, VideoCardComponent, FormsModule],
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
  videos: Video[] = [];

  filteredVideos: Video[] = [];

  constructor(private videoService: VideoService) {
    this.videoService.getAllVideos().then((list: Video[]) => {
      this.videos = list.sort((a, b) => {
        // Sort by createdAt (newest first)
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
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
