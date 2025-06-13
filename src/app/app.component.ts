import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="/assets/logo.svg"
            alt="logo"
            aria-hidden="true"
          />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-left">
            <a href="/imprint">Imprint</a>
            <span class="separator">|</span>
            <a href="/security">Security</a>
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
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Andy Grails';
}
