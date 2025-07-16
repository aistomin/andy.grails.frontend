import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-error.html',
  styleUrl: './test-error.scss',
})
export class TestErrorComponent {
  result: string = '';
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private apiService: ApiService) {}

  async testError(): Promise<void> {
    this.isLoading = true;
    this.hasError = false;
    this.result = '';

    try {
      const response = await this.apiService.get<any>('/test/error');
      this.result = 'Everything works! Server responded successfully.';
    } catch (error) {
      this.hasError = true;
      this.result = 'Error occurred and was handled properly!';
    } finally {
      this.isLoading = false;
    }
  }
}
