import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLink } from '../services/web-link';
import { WebLinksService } from '../services/web-links.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <a href="/privacy">Privacy</a>
          <span class="separator">|</span>
          <a href="/imprint">Imprint</a>
          <span class="separator">|</span>
          <a [href]="developerWebsiteLink?.url">Developer</a>
          <span class="separator" *ngIf="issueTrackerLink">|</span>
          <a
            *ngIf="issueTrackerLink"
            [href]="issueTrackerLink.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support
          </a>
        </div>
        <div class="footer-center">
          <p>&copy; 2025 Andy Grails</p>
        </div>
        <div class="footer-right">
          <a
            *ngIf="youtubeLink"
            [href]="youtubeLink.url"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i class="fab fa-youtube"></i>
          </a>
          <a
            *ngIf="instagramLink"
            [href]="instagramLink.url"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            *ngIf="facebookLink"
            [href]="facebookLink.url"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i class="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  webLinks: WebLink[] = [];
  youtubeLink?: WebLink;
  instagramLink?: WebLink;
  facebookLink?: WebLink;
  developerWebsiteLink?: WebLink;
  issueTrackerLink?: WebLink;

  constructor(private webLinksService: WebLinksService) {
    this.webLinksService.getWebLinks().then((links: WebLink[]) => {
      this.webLinks = links;
      this.youtubeLink = links.find((link) => link.type === 'YOUTUBE');
      this.instagramLink = links.find((link) => link.type === 'INSTAGRAM');
      this.facebookLink = links.find((link) => link.type === 'FACEBOOK');
      this.developerWebsiteLink = links.find(
        (link) => link.type === 'DEVELOPER_WEBSITE'
      );
      this.issueTrackerLink = links.find(
        (link) => link.type === 'ISSUE_TRACKER'
      );
    });
  }
}
