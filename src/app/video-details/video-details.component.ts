import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../services/video.service';
import { Video } from '../services/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  template: `
    <article>
      <iframe
        [src]="getYouTubeUrl()"
        class="video-details-youtube-video"
        frameborder="0"
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture; 
        web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      >
      </iframe>
      <section class="video-details-features">
        <h2 class="section-heading">{{ video?.title }}</h2>
      </section>
      <section class="video-details-features">
        {{ video?.description }}
      </section>
      <section class="video-details-features">
        <div class="video-dates">
          <p>
            <strong>Created:</strong>
            {{ video?.createdAt | date : 'dd.MM.yyyy HH:mm' }}
          </p>
          <p>
            <strong>Published:</strong>
            {{ video?.publishedAt | date : 'dd.MM.yyyy HH:mm' }}
          </p>
        </div>
      </section>
    </article>
  `,
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent {
  video: Video | undefined;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    const videoId = parseInt(this.route.snapshot.params['id'], 10);
    this.videoService
      .getVideoById(videoId)
      .then((vid) => {
        this.video = vid;
      })
      .catch((error) => {
        console.error('Error loading video:', error);
      });
  }

  getYouTubeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.video?.youtubeId}`
    );
  }
}
