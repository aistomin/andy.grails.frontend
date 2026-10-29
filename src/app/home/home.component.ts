import {
  Component,
  OnInit,
  ChangeDetectorRef,
  PendingTasks,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../services/video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, VideoCardComponent],
  template: `
    <div *ngIf="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">Loading videos...</p>
    </div>
    <section *ngIf="!isLoading">
      <form (submit)="filterResults(filter.value); $event.preventDefault()">
        <input
          type="text"
          placeholder="Filter by title and description"
          #filter
        />
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section *ngIf="!isLoading" class="results">
      <app-video-card
        *ngFor="let video of filteredVideos"
        [video]="video"
      ></app-video-card>
    </section>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = true;
  videos: Video[] = [];

  filteredVideos: Video[] = [];

  constructor(
    private videoService: VideoService,
    private cdr: ChangeDetectorRef,
    private pendingTasks: PendingTasks
  ) {}

  ngOnInit() {
    this.pendingTasks.run(() =>
      this.videoService
        .getAllVideos()
        .then((list: Video[]) => {
          this.videos = list.sort((a, b) => {
            // Sort by createdAt (newest first)
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          this.filteredVideos = this.videos;
          this.isLoading = false;
          this.cdr.markForCheck();
        })
        .catch((error) => {
          // ApiService has already sent the user to the matching error page.
          this.isLoading = false;
          console.error('Error loading videos:', error);
        })
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredVideos = this.videos;
    } else {
      const lowered = text.toLowerCase();
      const found = this.videos.filter(
        (video) =>
          video?.title?.toLowerCase().includes(lowered) ||
          video?.description?.toLowerCase().includes(lowered)
      );
      this.filteredVideos = found;
    }
  }
}
