import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../video.service';
import {Video} from '../video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  template: `
    <article>
      <iframe [src]="getYouTubeUrl()" 
        class="listing-photo"
        frameborder="0" 
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture; 
        web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
      </iframe>
      <section class="listing-features">
        <h2 class="section-heading">{{ video?.name }}</h2>
      </section>
      <section class="listing-features">
        {{ video?.description }}
      </section>
    </article>
  `,
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  video: Video | undefined;

  constructor(
    private videoService: VideoService, 
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer
  ) {
    const videoId = parseInt(this.route.snapshot.params['id'], 10);
    this.videoService.getVideoById(videoId).then((vid) => {
      this.video = vid;
    });
  }

  getYouTubeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video?.youtubeId}`);
  }
}
