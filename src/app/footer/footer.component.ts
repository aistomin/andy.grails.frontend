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
          <a href="/imprint">Imprint/Terms</a>
          <span class="separator">|</span>
          <a [href]="developerWebsiteLink?.url">Developed by me</a>
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

  constructor(private webLinksService: WebLinksService) {
    this.webLinksService.getWebLinks().then((links: WebLink[]) => {
      this.webLinks = links;
      this.youtubeLink = links.find(
        (link) => (link.type || link.socialMedia) === 'YOUTUBE'
      );
      this.instagramLink = links.find(
        (link) => (link.type || link.socialMedia) === 'INSTAGRAM'
      );
      this.facebookLink = links.find(
        (link) => (link.type || link.socialMedia) === 'FACEBOOK'
      );
      this.developerWebsiteLink = links.find(
        (link) => (link.type || link.socialMedia) === 'DEVELOPER_WEBSITE'
      );
    });
  }
}
