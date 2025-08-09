import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoDetailsComponent } from './video-details.component';
import { VideoService } from '../services/video.service';
import { Video } from '../services/video';
import { ResourceNotFoundException } from '../services/api-exceptions';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;
  let videoService: jasmine.SpyObj<VideoService>;
  let router: jasmine.SpyObj<Router>;
  let sanitizer: jasmine.SpyObj<DomSanitizer>;

  const mockVideo: Video = {
    id: 1,
    title: 'Test Video',
    description: 'This is a test video description',
    youtubeId: 'abc123',
    createdAt: '2024-01-01T10:00:00Z',
    publishedAt: '2024-01-01T12:00:00Z',
  };

  const mockUnpublishedVideo: Video = {
    id: 2,
    title: 'Unpublished Video',
    description: 'This video is not published yet',
    youtubeId: 'xyz789',
    createdAt: '2024-01-01T10:00:00Z',
    publishedAt: null,
  };

  beforeEach(async () => {
    const videoServiceSpy = jasmine.createSpyObj('VideoService', [
      'getVideoById',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);

    // Set up default mock behavior to prevent constructor errors
    videoServiceSpy.getVideoById.and.returnValue(Promise.resolve(mockVideo));

    await TestBed.configureTestingModule({
      imports: [VideoDetailsComponent],
      providers: [
        { provide: VideoService, useValue: videoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
    videoService = TestBed.inject(VideoService) as jasmine.SpyObj<VideoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    sanitizer = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load video on initialization', () => {
    videoService.getVideoById.and.returnValue(Promise.resolve(mockVideo));

    // Trigger ngOnInit by calling the constructor logic
    component = new VideoDetailsComponent(
      videoService,
      TestBed.inject(ActivatedRoute),
      TestBed.inject(DomSanitizer),
      router
    );

    expect(videoService.getVideoById).toHaveBeenCalledWith(1);
  });

  it('should set video property when video is loaded successfully', async () => {
    videoService.getVideoById.and.returnValue(Promise.resolve(mockVideo));

    // Create component and wait for video to load
    component = new VideoDetailsComponent(
      videoService,
      TestBed.inject(ActivatedRoute),
      TestBed.inject(DomSanitizer),
      router
    );

    // Wait for the promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(component.video).toEqual(mockVideo);
  });

  it('should handle 404 errors gracefully', async () => {
    const notFoundError = new ResourceNotFoundException('/api/videos/999');
    videoService.getVideoById.and.returnValue(Promise.reject(notFoundError));

    // Create component and wait for error to be handled
    component = new VideoDetailsComponent(
      videoService,
      TestBed.inject(ActivatedRoute),
      TestBed.inject(DomSanitizer),
      router
    );

    // Wait for the promise to reject and error handling to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // The ApiService should handle the 404 navigation automatically
    // We just need to verify that the component doesn't crash
    expect(component.video).toBeUndefined();
  });

  it('should handle other errors gracefully', async () => {
    const serverError = new Error('Server error');
    videoService.getVideoById.and.returnValue(Promise.reject(serverError));

    spyOn(console, 'error');

    // Create component and wait for error to be handled
    component = new VideoDetailsComponent(
      videoService,
      TestBed.inject(ActivatedRoute),
      TestBed.inject(DomSanitizer),
      router
    );

    // Wait for the promise to reject and error handling to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(console.error).toHaveBeenCalledWith(
      'Error loading video:',
      serverError
    );
    expect(component.video).toBeUndefined();
  });

  it('should generate correct YouTube URL', () => {
    component.video = mockVideo;
    const expectedUrl = `https://www.youtube.com/embed/${mockVideo.youtubeId}`;
    sanitizer.bypassSecurityTrustResourceUrl.and.returnValue(
      expectedUrl as any
    );

    const result = component.getYouTubeUrl();

    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      expectedUrl
    );
    expect(result).toBe(expectedUrl);
  });

  it('should handle undefined video in getYouTubeUrl', () => {
    component.video = undefined;
    const expectedUrl = 'https://www.youtube.com/embed/undefined';
    sanitizer.bypassSecurityTrustResourceUrl.and.returnValue(
      expectedUrl as any
    );

    const result = component.getYouTubeUrl();

    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      expectedUrl
    );
  });

  it('should handle unpublished videos correctly', async () => {
    videoService.getVideoById.and.returnValue(
      Promise.resolve(mockUnpublishedVideo)
    );

    // Create component and wait for video to load
    component = new VideoDetailsComponent(
      videoService,
      TestBed.inject(ActivatedRoute),
      TestBed.inject(DomSanitizer),
      router
    );

    // Wait for the promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(component.video).toEqual(mockUnpublishedVideo);
    expect(component.video?.publishedAt).toBeNull();
  });

  it('should parse video ID from route params correctly', () => {
    // Test with different route configurations
    const routeWithId = {
      snapshot: { params: { id: '123' } },
    };

    component = new VideoDetailsComponent(
      videoService,
      routeWithId as any,
      TestBed.inject(DomSanitizer),
      router
    );

    expect(videoService.getVideoById).toHaveBeenCalledWith(123);
  });

  it('should handle invalid video ID gracefully', () => {
    const routeWithInvalidId = {
      snapshot: { params: { id: 'invalid' } },
    };

    component = new VideoDetailsComponent(
      videoService,
      routeWithInvalidId as any,
      TestBed.inject(DomSanitizer),
      router
    );

    expect(videoService.getVideoById).toHaveBeenCalledWith(NaN);
  });
});
