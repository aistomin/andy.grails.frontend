import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { SocialMediaService } from '../services/social-media.service';
import { SocialMediaLink } from '../services/social-media-link';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mockSocialMediaService: jasmine.SpyObj<SocialMediaService>;

  const mockSocialMediaLinks: SocialMediaLink[] = [
    {
      id: 0,
      socialMedia: 'YOUTUBE',
      url: 'https://www.youtube.com/@andygrails',
    },
    {
      id: 1,
      socialMedia: 'INSTAGRAM',
      url: 'https://www.instagram.com/andy.grails/',
    },
    {
      id: 2,
      socialMedia: 'FACEBOOK',
      url: 'https://www.facebook.com/profile.php?id=100074082643728',
    },
    { id: 3, socialMedia: 'GITHUB', url: 'https://github.com/aistomin' },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SocialMediaService', [
      'getSocialMediaLinks',
    ]);
    spy.getSocialMediaLinks.and.returnValue(
      Promise.resolve(mockSocialMediaLinks)
    );

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [{ provide: SocialMediaService, useValue: spy }],
    }).compileComponents();

    mockSocialMediaService = TestBed.inject(
      SocialMediaService
    ) as jasmine.SpyObj<SocialMediaService>;
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer element', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('footer')).toBeTruthy();
  });

  it('should render footer content div', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.footer-content')).toBeTruthy();
  });

  it('should render footer left section with privacy link', () => {
    const compiled = fixture.nativeElement;
    const footerLeft = compiled.querySelector('.footer-left');
    const privacyLink = footerLeft.querySelector('a[href="/privacy"]');

    expect(footerLeft).toBeTruthy();
    expect(privacyLink).toBeTruthy();
    expect(privacyLink.textContent.trim()).toBe('Privacy');
  });

  it('should render footer left section with imprint link', () => {
    const compiled = fixture.nativeElement;
    const footerLeft = compiled.querySelector('.footer-left');
    const imprintLink = footerLeft.querySelector('a[href="/imprint"]');

    expect(imprintLink).toBeTruthy();
    expect(imprintLink.textContent.trim()).toBe('Imprint/Terms');
  });

  it('should render footer left section with GitHub link from API', async () => {
    // Wait for the component to load the data
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const footerLeft = compiled.querySelector('.footer-left');
    const githubLink = footerLeft.querySelector(
      'a[href="https://github.com/aistomin"]'
    );

    expect(githubLink).toBeTruthy();
    expect(githubLink.textContent.trim()).toBe('Developed by me');
  });

  it('should render footer center section with copyright', () => {
    const compiled = fixture.nativeElement;
    const footerCenter = compiled.querySelector('.footer-center');
    const copyrightText = footerCenter.querySelector('p');

    expect(footerCenter).toBeTruthy();
    expect(copyrightText).toBeTruthy();
    expect(copyrightText.textContent.trim()).toBe('© 2025 Andy Grails');
  });

  it('should render footer right section with social media links', () => {
    const compiled = fixture.nativeElement;
    const footerRight = compiled.querySelector('.footer-right');

    expect(footerRight).toBeTruthy();
  });

  it('should render YouTube social media link with correct attributes', async () => {
    // Wait for the component to load the data
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const youtubeLink = compiled.querySelector(
      'a[href="https://www.youtube.com/@andygrails"]'
    );

    expect(youtubeLink).toBeTruthy();
    expect(youtubeLink.getAttribute('target')).toBe('_blank');
    expect(youtubeLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(youtubeLink.getAttribute('aria-label')).toBe('YouTube');
    expect(youtubeLink.querySelector('.fab.fa-youtube')).toBeTruthy();
  });

  it('should render Instagram social media link with correct attributes', async () => {
    // Wait for the component to load the data
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const instagramLink = compiled.querySelector(
      'a[href="https://www.instagram.com/andy.grails/"]'
    );

    expect(instagramLink).toBeTruthy();
    expect(instagramLink.getAttribute('target')).toBe('_blank');
    expect(instagramLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(instagramLink.getAttribute('aria-label')).toBe('Instagram');
    expect(instagramLink.querySelector('.fab.fa-instagram')).toBeTruthy();
  });

  it('should render Facebook social media link with correct attributes', async () => {
    // Wait for the component to load the data
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const facebookLink = compiled.querySelector(
      'a[href="https://www.facebook.com/profile.php?id=100074082643728"]'
    );

    expect(facebookLink).toBeTruthy();
    expect(facebookLink.getAttribute('target')).toBe('_blank');
    expect(facebookLink.getAttribute('rel')).toBe('noopener noreferrer');
    expect(facebookLink.getAttribute('aria-label')).toBe('Facebook');
    expect(facebookLink.querySelector('.fab.fa-facebook')).toBeTruthy();
  });

  it('should render separators between footer left links', () => {
    const compiled = fixture.nativeElement;
    const separators = compiled.querySelectorAll('.separator');

    expect(separators.length).toBe(2);
    separators.forEach((separator: Element) => {
      expect(separator.textContent?.trim()).toBe('|');
    });
  });

  it('should call SocialMediaService.getSocialMediaLinks on init', () => {
    expect(mockSocialMediaService.getSocialMediaLinks).toHaveBeenCalled();
  });

  it('should handle empty social media links gracefully', async () => {
    // Reset the component and mock with empty data
    mockSocialMediaService.getSocialMediaLinks.and.returnValue(
      Promise.resolve([])
    );

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    // Social media links should not be rendered
    expect(compiled.querySelector('a[href*="youtube"]')).toBeFalsy();
    expect(compiled.querySelector('a[href*="instagram"]')).toBeFalsy();
    expect(compiled.querySelector('a[href*="facebook"]')).toBeFalsy();

    // GitHub link should not be rendered (since it's conditional now)
    expect(compiled.querySelector('a[href*="github"]')).toBeFalsy();
  });
});
