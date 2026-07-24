import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../services/video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, VideoCardComponent, FormsModule],
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
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
        this.isLoading = false;
        console.error('Error loading videos:', error);
        this.router.navigate(['/500']);
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
          video?.title?.toLowerCase().includes(lowered) ||
          video?.description?.toLowerCase().includes(lowered)
      );
      console.log('Found videos: ', found);
      this.filteredVideos = found;
    }
  }
}
