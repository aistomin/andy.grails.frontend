import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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
    const videoServiceSpy = jasmine.createSpyObj('VideoService', [
      'getAllVideos',
      'getVideoById',
    ]);
    videoServiceSpy.getAllVideos.and.returnValue(Promise.resolve([]));
    videoServiceSpy.getVideoById.and.returnValue(
      Promise.resolve({
        id: 1,
        title: 'Test Video',
        description: 'Test Description',
        youtubeId: 'abc123',
        createdAt: '2024-01-01T10:00:00Z',
        publishedAt: '2024-01-01T12:00:00Z',
      })
    );

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
      expect(routeConfig.length).toBe(9);
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

    it('should have test error route with correct title', () => {
      const testErrorRoute = routeConfig.find(
        (route) => route.path === 'test/error'
      );
      expect(testErrorRoute).toBeTruthy();
      expect(testErrorRoute?.title).toBe('Error Test - Andy Grails');
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
    it('should set correct title when navigating to home', fakeAsync(() => {
      router.navigate(['']);
      tick();
      expect(titleService.getTitle()).toBe('Andy Grails');
    }));

    it('should set correct title when navigating to privacy', fakeAsync(() => {
      router.navigate(['/privacy']);
      tick();
      expect(titleService.getTitle()).toBe('Privacy Policy - Andy Grails');
    }));

    it('should set correct title when navigating to imprint', fakeAsync(() => {
      router.navigate(['/imprint']);
      tick();
      expect(titleService.getTitle()).toBe('Imprint/Terms - Andy Grails');
    }));

    it('should set correct title when navigating to 500 error page', fakeAsync(() => {
      router.navigate(['/500']);
      tick();
      expect(titleService.getTitle()).toBe(
        'Internal Server Error - Andy Grails'
      );
    }));

    it('should set correct title when navigating to 404 error page', fakeAsync(() => {
      router.navigate(['/404']);
      tick();
      expect(titleService.getTitle()).toBe('Page Not Found - Andy Grails');
    }));

    it('should set correct title when navigating to test error page', fakeAsync(() => {
      router.navigate(['/test/error']);
      tick();
      expect(titleService.getTitle()).toBe('Error Test - Andy Grails');
    }));

    it('should set correct title when navigating to network error page', fakeAsync(() => {
      router.navigate(['/network/error']);
      tick();
      expect(titleService.getTitle()).toBe('Network Error - Andy Grails');
    }));

    it('should set correct title when navigating to video details', fakeAsync(() => {
      router.navigate(['/details/1']);
      tick();
      expect(titleService.getTitle()).toBe('Home details');
    }));

    it('should set correct title for unknown routes (wildcard)', fakeAsync(() => {
      router.navigate(['/some/unknown/route']);
      tick();
      expect(titleService.getTitle()).toBe('Page Not Found - Andy Grails');
    }));
  });

  describe('Route Navigation', () => {
    it('should navigate to home route', fakeAsync(() => {
      router.navigate(['']);
      tick();
      expect(location.path()).toBe('');
    }));

    it('should navigate to privacy route', fakeAsync(() => {
      router.navigate(['/privacy']);
      tick();
      expect(location.path()).toBe('/privacy');
    }));

    it('should navigate to imprint route', fakeAsync(() => {
      router.navigate(['/imprint']);
      tick();
      expect(location.path()).toBe('/imprint');
    }));

    it('should navigate to video details route', fakeAsync(() => {
      router.navigate(['/details/123']);
      tick();
      expect(location.path()).toBe('/details/123');
    }));

    it('should navigate to 500 error route', fakeAsync(() => {
      router.navigate(['/500']);
      tick();
      expect(location.path()).toBe('/500');
    }));

    it('should navigate to 404 error route', fakeAsync(() => {
      router.navigate(['/404']);
      tick();
      expect(location.path()).toBe('/404');
    }));

    it('should navigate to test error route', fakeAsync(() => {
      router.navigate(['/test/error']);
      tick();
      expect(location.path()).toBe('/test/error');
    }));

    it('should navigate to network error route', fakeAsync(() => {
      router.navigate(['/network/error']);
      tick();
      expect(location.path()).toBe('/network/error');
    }));

    it('should redirect unknown routes to 404 via wildcard', fakeAsync(() => {
      router.navigate(['/nonexistent-page']);
      tick();
      expect(location.path()).toBe('/nonexistent-page');
    }));
  });
});
