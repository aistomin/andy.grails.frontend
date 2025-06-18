import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <a href="/privacy">Privacy</a>
          <span class="separator">|</span>
          <a href="/imprint">Imprint/Terms</a>
          <span class="separator">|</span>
          <a href="https://github.com/aistomin">Developed by me</a>
        </div>
        <div class="footer-center">
          <p>&copy; 2025 Andy Grails</p>
        </div>
        <div class="footer-right">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i class="fab fa-youtube"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://facebook.com"
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
export class FooterComponent {}
