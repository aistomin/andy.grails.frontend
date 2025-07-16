import { Component } from '@angular/core';

@Component({
  selector: 'app-network-error',
  standalone: true,
  templateUrl: './network-error.html',
  styleUrl: './network-error.scss',
})
export class NetworkErrorComponent {
  retry() {
    window.location.reload();
  }
}
