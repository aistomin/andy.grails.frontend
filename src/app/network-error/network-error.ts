import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network-error',
  standalone: true,
  templateUrl: './network-error.html',
  styleUrl: './network-error.scss',
})
export class NetworkErrorComponent {
  constructor(private router: Router) {}

  retry() {
    const returnUrl = sessionStorage.getItem('networkErrorReturnUrl') || '/';
    sessionStorage.removeItem('networkErrorReturnUrl');
    this.router.navigate([returnUrl]);
  }
}
