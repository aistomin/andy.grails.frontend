import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { VideoService } from '../services/video.service';
import { Video } from '../services/video';

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
      createdAt: '2024-01-03T10:00:00Z',
      publishedAt: '2024-01-03T12:00:00Z',
    },
    {
      id: 3,
      title: 'Middle Video',
      description: 'This is a middle-aged video',
      youtubeId: 'def456',
      createdAt: '2024-01-02T10:00:00Z',
      publishedAt: null,
    },
  ];

  beforeEach(async () => {
    const videoServiceSpy = jasmine.createSpyObj('VideoService', [
      'getAllVideos',
    ]);
    // Don't set default return value here - let individual tests set it

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: VideoService, useValue: videoServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    videoService = TestBed.inject(VideoService) as jasmine.SpyObj<VideoService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load videos in constructor', async () => {
    // Set up the mock to return videos
    videoService.getAllVideos.and.returnValue(Promise.resolve(mockVideos));
    
    // Create a new component instance to trigger the constructor
    component = new HomeComponent(videoService);

    // Wait for the async operation to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(videoService.getAllVideos).toHaveBeenCalled();
    expect(component.videos.length).toBe(3);
  });

  it('should load videos and sort them by createdAt (newest first)', async () => {
    // Set up the mock to return videos
    videoService.getAllVideos.and.returnValue(Promise.resolve(mockVideos));
    
    // Create a new component instance to trigger the constructor
    component = new HomeComponent(videoService);

    // Wait for the async operation to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(videoService.getAllVideos).toHaveBeenCalled();
    expect(component.videos.length).toBe(3);

    // Check that videos are sorted by createdAt (newest first)
    expect(component.videos[0].id).toBe(2); // Newest (2024-01-03)
    expect(component.videos[1].id).toBe(3); // Middle (2024-01-02)
    expect(component.videos[2].id).toBe(1); // Oldest (2024-01-01)
  });

  it('should filter videos by title and description', async () => {
    // Set up videos first
    component.videos = mockVideos;
    component.filteredVideos = mockVideos;

    // Test filtering by title
    component.filterResults('Newest');
    expect(component.filteredVideos.length).toBe(1);
    expect(component.filteredVideos[0].title).toBe('Newest Video');

    // Test filtering by description
    component.filterResults('oldest');
    expect(component.filteredVideos.length).toBe(1);
    expect(component.filteredVideos[0].title).toBe('Oldest Video');

    // Test filtering with no results
    component.filterResults('nonexistent');
    expect(component.filteredVideos.length).toBe(0);

    // Test filtering with empty string (should show all)
    component.filterResults('');
    expect(component.filteredVideos.length).toBe(3);
  });

  it('should handle case-insensitive filtering', async () => {
    component.videos = mockVideos;
    component.filteredVideos = mockVideos;

    // Test case-insensitive filtering
    component.filterResults('VIDEO');
    expect(component.filteredVideos.length).toBe(3);

    component.filterResults('middle');
    expect(component.filteredVideos.length).toBe(1);
    expect(component.filteredVideos[0].title).toBe('Middle Video');
  });
});
