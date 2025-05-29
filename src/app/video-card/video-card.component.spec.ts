import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCardComponent } from './video-card.component';
import { Video } from '../video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

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
      imports: [VideoCardComponent, RouterTestingModule],
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
    const expectedUrl = `https://www.youtube.com/embed/${mockVideo.youtubeId}`;
    const spy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');

    component.getYouTubeUrl();

    expect(spy).toHaveBeenCalledWith(expectedUrl);
  });

  it('should truncate description to first sentence', () => {
    const result = component.truncateDescription(mockVideo.description);
    expect(result).toBe('This is a test video.');
  });

  it('should return full description if no sentence ending found', () => {
    const description = 'No sentence ending here';
    const result = component.truncateDescription(description);
    expect(result).toBe(description);
  });

  it('should render video title in template', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.video-card-heading').textContent).toContain(
      mockVideo.title
    );
  });

  it('should render truncated description in template', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.video-card-description').textContent.trim()
    ).toBe('This is a test video.');
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
});
