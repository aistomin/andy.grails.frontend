import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { VideoService } from './video.service';
import { ApiService } from './api.service';
import { Video } from './video';
import { ResourceNotFoundException } from './api-exceptions';

describe('VideoService', () => {
  let service: VideoService;
  let apiService: jest.Mocked<ApiService>;

  const mockVideo: Video = {
    id: 1,
    title: 'Test Video',
    description: 'Test description',
    youtubeId: 'abc123',
    createdAt: '2024-01-01T10:00:00Z',
    publishedAt: '2024-01-01T12:00:00Z',
  };

  beforeEach(() => {
    const apiServiceSpy: jest.Mocked<Partial<ApiService>> = {
      get: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        VideoService,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    service = TestBed.inject(VideoService);
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVideoById', () => {
    it('should return the video when found', async () => {
      apiService.get.mockResolvedValue(mockVideo);

      const result = await service.getVideoById(1);

      expect(apiService.get).toHaveBeenCalledWith('/videos/1');
      expect(result).toEqual(mockVideo);
    });

    it('should propagate ResourceNotFoundException when video is not found', async () => {
      const error = new ResourceNotFoundException('/videos/999');
      apiService.get.mockRejectedValue(error);

      await expect(service.getVideoById(999)).rejects.toThrow(
        ResourceNotFoundException
      );
    });
  });
});
