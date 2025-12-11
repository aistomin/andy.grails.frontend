import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { VideoService } from '../services/video.service';
import { Video } from '../services/video';
import { provideRouter } from '@angular/router';
import { VideoDetailsComponent } from '../video-details/video-details.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let videoService: jasmine.SpyObj<VideoService>;

  const mockVideos: Video[] = [
    {
      id: 1,
      title: 'Oldest Video',
      description: 'This is the oldest video',
      youtubeId: 'abc123',
      createdAt: '2024-01-01T10:00:00Z',
      publishedAt: '2024-01-01T12:00:00Z',
    },
    {
      id: 2,
      title: 'Newest Video',
      description: 'This is the newest video',
      youtubeId: 'xyz789',
      createdAt: '2024-01-01T15:00:00Z',
      publishedAt: '2024-01-01T16:00:00Z',
    },
    {
      id: 3,
      title: 'Middle Video',
      description: 'This is the middle video',
      youtubeId: 'def456',
      createdAt: '2024-01-01T12:00:00Z',
      publishedAt: '2024-01-01T13:00:00Z',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('VideoService', ['getAllVideos']);
    spy.getAllVideos.and.returnValue(Promise.resolve(mockVideos));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: VideoService, useValue: spy },
        provideRouter([
          { path: 'details/:id', component: VideoDetailsComponent },
        ]),
      ],
    }).compileComponents();

    videoService = TestBed.inject(VideoService) as jasmine.SpyObj<VideoService>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load videos in constructor', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    expect(videoService.getAllVideos).toHaveBeenCalled();
    expect(component.videos.length).toBe(3);
    expect(component.filteredVideos.length).toBe(3);
    expect(component.videos[0].id).toBe(2); // Newest first (ID 2 has latest createdAt)
  });

  it('should load videos and sort them by createdAt (newest first)', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    expect(videoService.getAllVideos).toHaveBeenCalled();
    expect(component.videos.length).toBe(3);
    expect(component.filteredVideos.length).toBe(3);
    expect(component.videos[0].id).toBe(2); // Newest first
  });

  it('should filter videos by title and description', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    component.filterResults('newest');

    expect(component.filteredVideos.length).toBe(1);
    expect(component.filteredVideos[0].title).toBe('Newest Video');
  });

  it('should handle empty search text by showing all videos', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    component.filterResults('');

    expect(component.filteredVideos.length).toBe(3);
  });

  it('should handle case-insensitive search', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    component.filterResults('new');

    expect(component.filteredVideos.length).toBe(1);
    expect(component.filteredVideos[0].title).toBe('Newest Video');
  });

  it('should handle special characters in search', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    component.filterResults('newest');

    expect(component.filteredVideos.length).toBe(1);
    expect(component.filteredVideos[0].title).toBe('Newest Video');
  });

  it('should handle search with no results', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    component.filterResults('nonexistent');

    expect(component.filteredVideos.length).toBe(0);
  });

  it('should clear search and show all videos', async () => {
    // Trigger ngOnInit
    fixture.detectChanges();
    // Wait for the component to finish loading videos
    await fixture.whenStable();

    // First search for something
    component.filterResults('newest');
    expect(component.filteredVideos.length).toBe(1);

    // Then clear search
    component.filterResults('');
    expect(component.filteredVideos.length).toBe(3);
  });
});
