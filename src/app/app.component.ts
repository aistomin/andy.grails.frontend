import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, FooterComponent],
  template: `
    <main>
      <header class="brand-name">
        <a [routerLink]="['/']" class="logo-link">
          <img class="brand-logo" src="/assets/logo.svg" alt="" />
          <span class="brand-text">Andy Grails</span>
        </a>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
      <app-footer></app-footer>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
