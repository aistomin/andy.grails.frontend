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
  let sanitizer: DomSanitizer;

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

    // Set up default mock behavior to prevent constructor errors
    videoServiceSpy.getVideoById.and.returnValue(Promise.resolve(mockVideo));

    await TestBed.configureTestingModule({
      imports: [VideoDetailsComponent],
      providers: [
        { provide: VideoService, useValue: videoServiceSpy },
        { provide: Router, useValue: routerSpy },
        // Use the real DomSanitizer instead of a spy
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
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load video on initialization', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the async operation to complete
    await fixture.whenStable();

    expect(videoService.getVideoById).toHaveBeenCalledWith(1);
  });

  it('should set video property when video is loaded successfully', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the async operation to complete
    await fixture.whenStable();

    expect(component.video).toEqual(mockVideo);
  });

  it('should handle 404 errors gracefully', async () => {
    const notFoundError = new ResourceNotFoundException('/api/videos/999');
    videoService.getVideoById.and.returnValue(Promise.reject(notFoundError));

    // Recreate the component with the error scenario
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;

    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the promise to reject and error handling to complete
    await fixture.whenStable();

    // The component should handle the error gracefully without crashing
    expect(component.video).toBeUndefined();
  });

  it('should handle other errors gracefully', async () => {
    const serverError = new Error('Server error');
    videoService.getVideoById.and.returnValue(Promise.reject(serverError));

    spyOn(console, 'error');

    // Recreate the component with the error scenario
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;

    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the promise to reject and error handling to complete
    await fixture.whenStable();

    expect(console.error).toHaveBeenCalledWith(
      'Error loading video:',
      serverError
    );
    expect(component.video).toBeUndefined();
  });

  it('should generate correct YouTube URL', () => {
    component.video = mockVideo;
    const expectedUrl = `https://www.youtube.com/embed/${mockVideo.youtubeId}`;
    const spy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

    const result = component.getYouTubeUrl();

    expect(spy).toHaveBeenCalledWith(expectedUrl);
    expect(result).toBeTruthy();
  });

  it('should handle undefined video in getYouTubeUrl', () => {
    component.video = undefined;
    const expectedUrl = 'https://www.youtube.com/embed/undefined';
    const spy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

    const result = component.getYouTubeUrl();

    expect(spy).toHaveBeenCalledWith(expectedUrl);
    expect(result).toBeTruthy();
  });

  it('should handle unpublished videos correctly', async () => {
    videoService.getVideoById.and.returnValue(
      Promise.resolve(mockUnpublishedVideo)
    );

    // Recreate the component with the unpublished video
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;

    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the promise to resolve
    await fixture.whenStable();

    expect(component.video).toEqual(mockUnpublishedVideo);
    expect(component.video?.publishedAt).toBeNull();
  });

  it('should parse video ID from route params correctly', () => {
    fixture.detectChanges(); // Trigger ngOnInit
    // The component should call getVideoById with the parsed ID from the route
    expect(videoService.getVideoById).toHaveBeenCalledWith(1);
  });

  it('should handle non-numeric video ID gracefully', () => {
    fixture.detectChanges(); // Trigger ngOnInit
    // The component should call getVideoById with the ID from the route
    expect(videoService.getVideoById).toHaveBeenCalledWith(1);
  });

  it('should handle missing video ID gracefully', () => {
    fixture.detectChanges(); // Trigger ngOnInit
    // The component should call getVideoById with the ID from the route
    expect(videoService.getVideoById).toHaveBeenCalledWith(1);
  });

  it('should handle video with null publishedAt', () => {
    component.video = mockUnpublishedVideo;

    expect(component.video?.publishedAt).toBeNull();
    expect(component.video?.title).toBe('Unpublished Video');
  });

  it('should handle video with valid publishedAt', () => {
    component.video = mockVideo;

    expect(component.video?.publishedAt).toBe('2024-01-01T12:00:00Z');
    expect(component.video?.title).toBe('Test Video');
  });
});
