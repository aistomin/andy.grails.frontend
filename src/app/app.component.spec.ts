import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { WebLinksService } from './services/web-links.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        {
          provide: WebLinksService,
          useValue: { getWebLinks: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should wrap the logo and the brand text in a single home link', () => {
    const header: HTMLElement = fixture.nativeElement.querySelector('header');
    const links = header.querySelectorAll('a');

    expect(links.length).toBe(1);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[0].classList).toContain('logo-link');
    expect(links[0].querySelector('img.brand-logo')).toBeTruthy();
    expect(links[0].querySelector('.brand-text')?.textContent?.trim()).toBe(
      'Andy Grails'
    );
  });

  it('should name the home link "Andy Grails" with a decorative logo', () => {
    const link: HTMLAnchorElement =
      fixture.nativeElement.querySelector('header a.logo-link');
    const logo = link.querySelector('img') as HTMLImageElement;

    expect(logo.getAttribute('alt')).toBe('');
    expect(logo.hasAttribute('aria-hidden')).toBe(false);
    expect(link.textContent?.trim()).toBe('Andy Grails');
  });
});
