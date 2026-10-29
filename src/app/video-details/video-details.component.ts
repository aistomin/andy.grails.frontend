import {
  Component,
  OnInit,
  ChangeDetectorRef,
  PendingTasks,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../services/video.service';
import { Video } from '../services/video';
import {
  DomSanitizer,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  template: `
    <article *ngIf="video">
      <iframe
        [src]="getYouTubeUrl(video)"
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
        <h2 class="section-heading">{{ video.title }}</h2>
      </section>
      <section class="video-details-features video-description">
        {{ video.description }}
      </section>
      <section class="video-details-features">
        <div class="video-dates">
          <p>
            <strong>Created:</strong>
            {{ video.createdAt | date : 'dd.MM.yyyy HH:mm' }}
          </p>
          <p>
            <strong>Published:</strong>
            {{
              video.publishedAt
                ? (video.publishedAt | date : 'dd.MM.yyyy HH:mm')
                : 'Not published yet'
            }}
          </p>
        </div>
      </section>
    </article>
    <section *ngIf="loadFailed" class="video-details-error">
      <h2 class="section-heading">Video could not be loaded</h2>
      <p>Something went wrong while loading this video. Please try again later.</p>
    </section>
  `,
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent implements OnInit {
  video: Video | undefined;
  loadFailed = false;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private pendingTasks: PendingTasks,
    private title: Title
  ) {}

  ngOnInit() {
    const videoId = Number(this.route.snapshot.params['id']);
    if (!Number.isInteger(videoId)) {
      this.router.navigate(['/404']);
      return;
    }
    this.pendingTasks.run(() =>
      this.videoService
        .getVideoById(videoId)
        .then((vid) => {
          this.video = vid;
          this.title.setTitle(`${vid.title} - Andy Grails`);
          this.cdr.markForCheck();
        })
        .catch((error) => {
          // ApiService has already sent the user to the matching error page
          // for HTTP and network failures; this covers whatever is left.
          console.error('Error loading video:', error);
          this.loadFailed = true;
          this.cdr.markForCheck();
        })
    );
  }

  getYouTubeUrl(video: Video): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video.youtubeId}`
    );
  }
}
