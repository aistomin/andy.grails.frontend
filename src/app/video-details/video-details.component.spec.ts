import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { VideoDetailsComponent } from './video-details.component';
import { VideoService } from '../services/video.service';
import { Video } from '../services/video';
import { ResourceNotFoundException } from '../services/api-exceptions';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;
  let videoService: jest.Mocked<VideoService>;
  let router: jest.Mocked<Router>;
  let sanitizer: DomSanitizer;
  let title: Title;
  let mockRouteParams: { id: string };

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
    mockRouteParams = { id: '1' };
    const videoServiceSpy = {
      getVideoById: jest.fn().mockResolvedValue(mockVideo),
    };
    const routerSpy = {
      navigate: jest.fn(),
    };

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
              params: mockRouteParams,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
    videoService = TestBed.inject(VideoService) as jest.Mocked<VideoService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    sanitizer = TestBed.inject(DomSanitizer);
    title = TestBed.inject(Title);
    title.setTitle('Video - Andy Grails');
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
    videoService.getVideoById.mockRejectedValue(notFoundError);

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
    videoService.getVideoById.mockRejectedValue(serverError);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Recreate the component with the error scenario
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;

    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the promise to reject and error handling to complete
    await fixture.whenStable();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error loading video:',
      serverError
    );
    expect(component.video).toBeUndefined();

    consoleErrorSpy.mockRestore();
  });

  it('should set the browser tab title to the video title once loaded', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(title.getTitle()).toBe('Test Video - Andy Grails');
  });

  it('should keep the fallback tab title when the video fails to load', async () => {
    videoService.getVideoById.mockRejectedValue(new Error('Server error'));
    jest.spyOn(console, 'error').mockImplementation();

    fixture = TestBed.createComponent(VideoDetailsComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(title.getTitle()).toBe('Video - Andy Grails');
  });

  it('should generate correct YouTube URL', () => {
    const expectedUrl = `https://www.youtube.com/embed/${mockVideo.youtubeId}`;
    const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');

    const result = component.getYouTubeUrl(mockVideo);

    expect(spy).toHaveBeenCalledWith(expectedUrl);
    expect(result).toBeTruthy();

    spy.mockRestore();
  });

  it('should not render the player before the video is loaded', () => {
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.querySelector('iframe')).toBeNull();
    expect(compiled.querySelector('.video-details-error')).toBeNull();
  });

  it('should render the player with the video id once loaded', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const iframe: HTMLIFrameElement | null =
      fixture.nativeElement.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.src).toBe(
      `https://www.youtube.com/embed/${mockVideo.youtubeId}`
    );
    expect(fixture.nativeElement.textContent).toContain(mockVideo.title);
  });

  it('should show an error state instead of the player when loading fails', async () => {
    videoService.getVideoById.mockRejectedValue(new Error('Server error'));
    jest.spyOn(console, 'error').mockImplementation();

    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    expect(component.loadFailed).toBe(true);
    expect(compiled.querySelector('iframe')).toBeNull();
    expect(compiled.textContent).toContain('Video could not be loaded');
  });

  it('should handle unpublished videos correctly', async () => {
    videoService.getVideoById.mockResolvedValue(mockUnpublishedVideo);

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

  it('should redirect to 404 for a non-numeric video ID without calling the API', () => {
    mockRouteParams.id = 'abc';
    fixture.detectChanges(); // Trigger ngOnInit
    expect(videoService.getVideoById).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/404']);
  });

  it('should redirect to 404 for a decimal video ID without calling the API', () => {
    mockRouteParams.id = '1.5';
    fixture.detectChanges(); // Trigger ngOnInit
    expect(videoService.getVideoById).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/404']);
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
