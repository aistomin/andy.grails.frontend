import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render privacy container', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.privacy-container')).toBeTruthy();
  });

  it('should render privacy content div', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.privacy-content')).toBeTruthy();
  });

  it('should render main heading', () => {
    const compiled = fixture.nativeElement;
    const heading = compiled.querySelector('h1');

    expect(heading).toBeTruthy();
    expect(heading.textContent.trim()).toBe('Privacy Policy');
  });

  it('should render last updated date', () => {
    const compiled = fixture.nativeElement;
    const lastUpdated = compiled.querySelector('.last-updated');

    expect(lastUpdated).toBeTruthy();
    expect(lastUpdated.textContent.trim()).toBe('Last updated: January 2025');
  });

  it('should render introduction section', () => {
    const compiled = fixture.nativeElement;
    const section = compiled.querySelector('section');
    const heading = section.querySelector('h2');

    expect(section).toBeTruthy();
    expect(heading.textContent.trim()).toBe('1. Introduction');
  });

  it('should render information collection section with subsections', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const infoSection = sections[1]; // Second section (index 1)
    const heading = infoSection.querySelector('h2');
    const subsections = infoSection.querySelectorAll('h3');

    expect(heading.textContent.trim()).toBe('2. Information We Collect');
    expect(subsections.length).toBe(2);
    expect(subsections[0].textContent.trim()).toBe(
      '2.1 Information You Provide'
    );
    expect(subsections[1].textContent.trim()).toBe(
      '2.2 Automatically Collected Information'
    );
  });

  it('should render information you provide list items', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const infoSection = sections[1];
    const firstList = infoSection.querySelector('ul');
    const listItems = firstList.querySelectorAll('li');

    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent.trim()).toBe(
      'Contact information (name, email address)'
    );
    expect(listItems[1].textContent.trim()).toBe(
      'Comments or feedback you submit'
    );
    expect(listItems[2].textContent.trim()).toBe(
      'Information you provide when contacting us'
    );
  });

  it('should render automatically collected information list items', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const infoSection = sections[1];
    const lists = infoSection.querySelectorAll('ul');
    const secondList = lists[1];
    const listItems = secondList.querySelectorAll('li');

    expect(listItems.length).toBe(5);
    expect(listItems[0].textContent.trim()).toBe(
      'IP address and location data'
    );
    expect(listItems[1].textContent.trim()).toBe('Browser type and version');
    expect(listItems[2].textContent.trim()).toBe('Operating system');
    expect(listItems[3].textContent.trim()).toBe(
      'Pages visited and time spent on pages'
    );
    expect(listItems[4].textContent.trim()).toBe(
      'Referring website information'
    );
  });

  it('should render how we use information section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const useSection = sections[2]; // Third section (index 2)
    const heading = useSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('3. How We Use Your Information');
  });

  it('should render how we use information list items', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const useSection = sections[2];
    const list = useSection.querySelector('ul');
    const listItems = list.querySelectorAll('li');

    expect(listItems.length).toBe(5);
    expect(listItems[0].textContent.trim()).toBe(
      'To provide and maintain our website'
    );
    expect(listItems[1].textContent.trim()).toBe('To improve user experience');
    expect(listItems[2].textContent.trim()).toBe(
      'To respond to your inquiries and provide customer support'
    );
    expect(listItems[3].textContent.trim()).toBe(
      'To analyze website usage and trends'
    );
    expect(listItems[4].textContent.trim()).toBe(
      'To ensure website security and prevent fraud'
    );
  });

  it('should render cookies section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const cookiesSection = sections[3]; // Fourth section (index 3)
    const heading = cookiesSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe(
      '4. Cookies and Tracking Technologies'
    );
  });

  it('should render third-party services section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const thirdPartySection = sections[4]; // Fifth section (index 4)
    const heading = thirdPartySection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('5. Third-Party Services');
  });

  it('should render data security section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const securitySection = sections[5]; // Sixth section (index 5)
    const heading = securitySection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('6. Data Security');
  });

  it('should render your rights section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const rightsSection = sections[6]; // Seventh section (index 6)
    const heading = rightsSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('7. Your Rights');
  });

  it('should render your rights list items', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const rightsSection = sections[6];
    const list = rightsSection.querySelector('ul');
    const listItems = list.querySelectorAll('li');

    expect(listItems.length).toBe(5);
    expect(listItems[0].textContent.trim()).toBe('Access your personal data');
    expect(listItems[1].textContent.trim()).toBe('Correct inaccurate data');
    expect(listItems[2].textContent.trim()).toBe(
      'Request deletion of your data'
    );
    expect(listItems[3].textContent.trim()).toBe(
      'Object to processing of your data'
    );
    expect(listItems[4].textContent.trim()).toBe(
      'Withdraw consent where applicable'
    );
  });

  it('should render children privacy section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const childrenSection = sections[7]; // Eighth section (index 7)
    const heading = childrenSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe("8. Children's Privacy");
  });

  it('should render changes to policy section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const changesSection = sections[8]; // Ninth section (index 8)
    const heading = changesSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('9. Changes to This Policy');
  });

  it('should not render commented out contact section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const lastSection = sections[sections.length - 1];
    const lastHeading = lastSection.querySelector('h2');

    // The last section should be "9. Changes to This Policy", not "10. Contact Us"
    expect(lastHeading.textContent.trim()).toBe('9. Changes to This Policy');
  });

  it('should have correct number of sections', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');

    // Should have 9 sections (1-9, excluding the commented out section 10)
    expect(sections.length).toBe(9);
  });

  it('should contain Andy Grails branding in content', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;

    expect(content).toContain('Andy Grails');
  });

  it('should contain proper privacy policy language', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;

    expect(content).toContain('privacy');
    expect(content).toContain('personal data');
    expect(content).toContain('cookies');
    expect(content).toContain('security');
    expect(content).toContain('Rights');
  });

  it('should contain data collection information', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;

    expect(content).toContain('IP address');
    expect(content).toContain('browser');
    expect(content).toContain('Operating system');
    expect(content).toContain('Contact information');
  });

  it('should contain user rights information', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;

    expect(content).toContain('Access your personal data');
    expect(content).toContain('Correct inaccurate data');
    expect(content).toContain('Request deletion');
    expect(content).toContain('Withdraw consent');
  });

  it('should contain children privacy information', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;

    expect(content).toContain('children under 13');
    expect(content).toContain('not intended for children');
  });
});
