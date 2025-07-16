import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-server-error',
  standalone: true,
  imports: [],
  templateUrl: './internal-server-error.html',
  styleUrl: './internal-server-error.scss',
})
export class InternalServerErrorComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
