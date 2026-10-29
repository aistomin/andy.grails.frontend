import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCardComponent } from './video-card.component';
import { Video } from '../services/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { VideoDetailsComponent } from '../video-details/video-details.component';

describe('VideoCardComponent', () => {
  let component: VideoCardComponent;
  let fixture: ComponentFixture<VideoCardComponent>;
  let sanitizer: DomSanitizer;

  const mockVideo: Video = {
    id: 1,
    title: 'Test Video',
    description:
      'This is a test video. It has multiple sentences. This is the second sentence.',
    youtubeId: 'abc123',
    createdAt: '2024-01-01',
    publishedAt: '2024-01-01',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCardComponent],
      providers: [
        provideRouter([{ path: 'details/:id', component: VideoDetailsComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoCardComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    component.video = mockVideo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set video input correctly', () => {
    expect(component.video).toEqual(mockVideo);
  });

  it('should generate correct YouTube URL', () => {
    const expectedUrl = `https://www.youtube-nocookie.com/embed/${mockVideo.youtubeId}`;
    const spy = jest.spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');

    component.getYouTubeUrl();

    expect(spy).toHaveBeenCalledWith(expectedUrl);

    spy.mockRestore();
  });

  it('should render video title in template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.video-card-heading').textContent).toContain(
      mockVideo.title
    );
  });

  it('should render full description in template', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.video-card-description').textContent.trim()
    ).toBe(mockVideo.description);
  });

  it('should not cut description at abbreviations', () => {
    const description = 'J. S. Bach - Bourrée. Second sentence.';
    fixture.componentRef.setInput('video', { ...mockVideo, description });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.video-card-description').textContent.trim()
    ).toBe(description);
  });

  it('should render YouTube iframe with correct attributes', () => {
    const compiled = fixture.nativeElement;
    const iframe = compiled.querySelector('iframe');

    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('frameborder')).toBe('0');
    expect(iframe.getAttribute('allowfullscreen')).toBe('');
    expect(iframe.getAttribute('referrerpolicy')).toBe(
      'strict-origin-when-cross-origin'
    );
  });

  it('should load the player from the privacy-enhanced YouTube domain', () => {
    const iframe: HTMLIFrameElement = fixture.nativeElement.querySelector('iframe');
    expect(iframe.src).toBe(
      `https://www.youtube-nocookie.com/embed/${mockVideo.youtubeId}`
    );
  });

  it('should give the iframe the video title and load it lazily', () => {
    const iframe: HTMLIFrameElement = fixture.nativeElement.querySelector('iframe');
    expect(iframe.title).toBe(mockVideo.title);
    expect(iframe.getAttribute('loading')).toBe('lazy');
  });
});
