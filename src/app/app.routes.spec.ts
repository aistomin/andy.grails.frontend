import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import routeConfig from './app.routes';
import { VideoService } from './services/video.service';

describe('App Routes', () => {
  let router: Router;
  let location: Location;
  let titleService: Title;

  beforeEach(async () => {
    const videoServiceSpy = {
      getAllVideos: jest.fn().mockResolvedValue([]),
      getVideoById: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Test Video',
        description: 'Test Description',
        youtubeId: 'abc123',
        createdAt: '2024-01-01T10:00:00Z',
        publishedAt: '2024-01-01T12:00:00Z',
      }),
    };

    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routeConfig),
        { provide: VideoService, useValue: videoServiceSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    titleService = TestBed.inject(Title);
  });

  describe('Route Configuration', () => {
    it('should have correct number of routes', () => {
      expect(routeConfig.length).toBe(8);
    });

    it('should have home route with correct title', () => {
      const homeRoute = routeConfig.find((route) => route.path === '');
      expect(homeRoute).toBeTruthy();
      expect(homeRoute?.title).toBe('Andy Grails');
    });

    it('should have video details route with correct title', () => {
      const detailsRoute = routeConfig.find(
        (route) => route.path === 'details/:id'
      );
      expect(detailsRoute).toBeTruthy();
      expect(detailsRoute?.title).toBe('Home details');
    });

    it('should have privacy route with correct title', () => {
      const privacyRoute = routeConfig.find(
        (route) => route.path === 'privacy'
      );
      expect(privacyRoute).toBeTruthy();
      expect(privacyRoute?.title).toBe('Privacy Policy - Andy Grails');
    });

    it('should have imprint route with correct title', () => {
      const imprintRoute = routeConfig.find(
        (route) => route.path === 'imprint'
      );
      expect(imprintRoute).toBeTruthy();
      expect(imprintRoute?.title).toBe('Imprint/Terms - Andy Grails');
    });

    it('should have 500 error route with correct title', () => {
      const errorRoute = routeConfig.find((route) => route.path === '500');
      expect(errorRoute).toBeTruthy();
      expect(errorRoute?.title).toBe('Internal Server Error - Andy Grails');
    });

    it('should have 404 error route with correct title', () => {
      const notFoundRoute = routeConfig.find((route) => route.path === '404');
      expect(notFoundRoute).toBeTruthy();
      expect(notFoundRoute?.title).toBe('Page Not Found - Andy Grails');
    });

    it('should have network error route with correct title', () => {
      const networkErrorRoute = routeConfig.find(
        (route) => route.path === 'network/error'
      );
      expect(networkErrorRoute).toBeTruthy();
      expect(networkErrorRoute?.title).toBe('Network Error - Andy Grails');
    });

    it('should have wildcard route with correct title', () => {
      const wildcardRoute = routeConfig.find((route) => route.path === '**');
      expect(wildcardRoute).toBeTruthy();
      expect(wildcardRoute?.title).toBe('Page Not Found - Andy Grails');
    });
  });

  describe('Page Title Navigation', () => {
    it('should set correct title when navigating to home', async () => {
      await router.navigate(['']);
      expect(titleService.getTitle()).toBe('Andy Grails');
    });

    it('should set correct title when navigating to privacy', async () => {
      await router.navigate(['/privacy']);
      expect(titleService.getTitle()).toBe('Privacy Policy - Andy Grails');
    });

    it('should set correct title when navigating to imprint', async () => {
      await router.navigate(['/imprint']);
      expect(titleService.getTitle()).toBe('Imprint/Terms - Andy Grails');
    });

    it('should set correct title when navigating to 500 error page', async () => {
      await router.navigate(['/500']);
      expect(titleService.getTitle()).toBe(
        'Internal Server Error - Andy Grails'
      );
    });

    it('should set correct title when navigating to 404 error page', async () => {
      await router.navigate(['/404']);
      expect(titleService.getTitle()).toBe('Page Not Found - Andy Grails');
    });

    it('should set correct title when navigating to network error page', async () => {
      await router.navigate(['/network/error']);
      expect(titleService.getTitle()).toBe('Network Error - Andy Grails');
    });

    it('should set correct title when navigating to video details', async () => {
      await router.navigate(['/details/1']);
      expect(titleService.getTitle()).toBe('Home details');
    });

    it('should set correct title for unknown routes (wildcard)', async () => {
      await router.navigate(['/some/unknown/route']);
      expect(titleService.getTitle()).toBe('Page Not Found - Andy Grails');
    });
  });

  describe('Route Navigation', () => {
    it('should navigate to home route', async () => {
      await router.navigate(['']);
      expect(location.path()).toBe('');
    });

    it('should navigate to privacy route', async () => {
      await router.navigate(['/privacy']);
      expect(location.path()).toBe('/privacy');
    });

    it('should navigate to imprint route', async () => {
      await router.navigate(['/imprint']);
      expect(location.path()).toBe('/imprint');
    });

    it('should navigate to video details route', async () => {
      await router.navigate(['/details/123']);
      expect(location.path()).toBe('/details/123');
    });

    it('should navigate to 500 error route', async () => {
      await router.navigate(['/500']);
      expect(location.path()).toBe('/500');
    });

    it('should navigate to 404 error route', async () => {
      await router.navigate(['/404']);
      expect(location.path()).toBe('/404');
    });

    it('should navigate to network error route', async () => {
      await router.navigate(['/network/error']);
      expect(location.path()).toBe('/network/error');
    });

    it('should redirect unknown routes to 404 via wildcard', async () => {
      await router.navigate(['/nonexistent-page']);
      expect(location.path()).toBe('/nonexistent-page');
    });
  });
});
