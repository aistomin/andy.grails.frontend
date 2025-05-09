import { Component, Input } from '@angular/core';
import { Video } from '../video';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-card',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="video-card">
      <iframe [src]="getYouTubeUrl()" 
        class="video-card-youtube-video"
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
      <h2 class="video-card-heading">{{ video.name }}</h2>
      <p class="video-card-description">{{ video.description }}</p>
      <a [routerLink]="['/details', video.id]">Read more ...</a>
    </section>
  `,
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {

  @Input() video!: Video;

  constructor(private sanitizer: DomSanitizer) {}

  getYouTubeUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video.youtubeId}`);
  }
}
