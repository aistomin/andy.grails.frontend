import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-message">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  goBack(): void {
    window.history.back();
  }
}
