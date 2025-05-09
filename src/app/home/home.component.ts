import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, VideoCardComponent],
  providers: [VideoService],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-video-card
        *ngFor="let video of filteredLocations"
        [video]="video"
      ></app-video-card>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  housingLocations: Video[] = [];

  filteredLocations: Video[] = [];

  constructor(private housingService: VideoService) {
    this.housingService.getAllVideos().then((list: Video[]) => {
      this.housingLocations = list;
      this.filteredLocations = list;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.housingLocations;
      return;
    }
    this.filteredLocations = this.housingLocations.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
