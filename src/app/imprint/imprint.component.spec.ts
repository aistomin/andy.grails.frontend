import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImprintComponent } from './imprint.component';

describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render imprint container', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.imprint-container')).toBeTruthy();
  });

  it('should render imprint content div', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.imprint-content')).toBeTruthy();
  });

  it('should render main heading', () => {
    const compiled = fixture.nativeElement;
    const heading = compiled.querySelector('h1');

    expect(heading).toBeTruthy();
    expect(heading.textContent.trim()).toBe('Imprint / Legal Notice');
  });

  it('should render last updated date', () => {
    const compiled = fixture.nativeElement;
    const lastUpdated = compiled.querySelector('.last-updated');

    expect(lastUpdated).toBeTruthy();
    expect(lastUpdated.textContent.trim()).toBe('Last updated: January 2025');
  });

  it('should render website information section', () => {
    const compiled = fixture.nativeElement;
    const section = compiled.querySelector('section');
    const heading = section.querySelector('h2');
    const infoBlock = section.querySelector('.info-block');

    expect(section).toBeTruthy();
    expect(heading.textContent.trim()).toBe('1. Website Information');
    expect(infoBlock).toBeTruthy();
  });

  it('should render correct website information', () => {
    const compiled = fixture.nativeElement;
    const infoBlock = compiled.querySelector('.info-block');
    const paragraphs = infoBlock.querySelectorAll('p');

    expect(paragraphs.length).toBe(3);
    expect(paragraphs[0].textContent.trim()).toContain('Website: Andy Grails');
    expect(paragraphs[1].textContent.trim()).toContain(
      'URL: https://andy-grails.de'
    );
    expect(paragraphs[2].textContent.trim()).toContain(
      'Type: Video content and entertainment platform'
    );
  });

  it('should render content responsibility section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const contentSection = sections[1]; // Second section (index 1)
    const heading = contentSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('3. Content Responsibility');
  });

  it('should render external links section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const externalLinksSection = sections[2]; // Third section (index 2)
    const heading = externalLinksSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('4. External Links');
  });

  it('should render copyright section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const copyrightSection = sections[3]; // Fourth section (index 3)
    const heading = copyrightSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe(
      '5. Copyright and Intellectual Property'
    );
  });

  it('should render terms of use section with subsections', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const termsSection = sections[4]; // Fifth section (index 4)
    const heading = termsSection.querySelector('h2');
    const subsections = termsSection.querySelectorAll('h3');

    expect(heading.textContent.trim()).toBe('6. Terms of Use');
    expect(subsections.length).toBe(2);
    expect(subsections[0].textContent.trim()).toBe('6.1 Acceptable Use');
    expect(subsections[1].textContent.trim()).toBe(
      '6.2 User-Generated Content'
    );
  });

  it('should render acceptable use list items', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const termsSection = sections[4];
    const list = termsSection.querySelector('ul');
    const listItems = list.querySelectorAll('li');

    expect(listItems.length).toBe(4);
    expect(listItems[0].textContent.trim()).toBe(
      'Use the website for lawful purposes only'
    );
    expect(listItems[1].textContent.trim()).toBe(
      'Respect intellectual property rights'
    );
    expect(listItems[2].textContent.trim()).toBe(
      'Not interfere with website functionality'
    );
    expect(listItems[3].textContent.trim()).toBe(
      'Not attempt to gain unauthorized access to our systems'
    );
  });

  it('should render disclaimer of warranties section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const disclaimerSection = sections[5]; // Sixth section (index 5)
    const heading = disclaimerSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('7. Disclaimer of Warranties');
  });

  it('should render disclaimer list items', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const disclaimerSection = sections[5];
    const list = disclaimerSection.querySelector('ul');
    const listItems = list.querySelectorAll('li');

    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent.trim()).toContain(
      'Warranties of merchantability and fitness for a particular purpose'
    );
    expect(listItems[1].textContent.trim()).toContain(
      'Warranties that the website will be uninterrupted or error-free'
    );
    expect(listItems[2].textContent.trim()).toContain(
      'Warranties regarding the accuracy or reliability of content'
    );
  });

  it('should render limitation of liability section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const liabilitySection = sections[6]; // Seventh section (index 6)
    const heading = liabilitySection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('8. Limitation of Liability');
  });

  it('should render governing law section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const governingLawSection = sections[7]; // Eighth section (index 7)
    const heading = governingLawSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('9. Governing Law');
  });

  it('should render changes to terms section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const changesSection = sections[8]; // Ninth section (index 8)
    const heading = changesSection.querySelector('h2');

    expect(heading.textContent.trim()).toBe('10. Changes to Terms');
  });

  it('should not render commented out website owner section', () => {
    const compiled = fixture.nativeElement;
    const websiteOwnerSection = compiled.querySelector('section h2');

    // The first section should be "1. Website Information", not "2. Website Owner"
    expect(websiteOwnerSection.textContent.trim()).toBe(
      '1. Website Information'
    );
  });

  it('should not render commented out contact information section', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');
    const lastSection = sections[sections.length - 1];
    const lastHeading = lastSection.querySelector('h2');

    // The last section should be "10. Changes to Terms", not "11. Contact Information"
    expect(lastHeading.textContent.trim()).toBe('10. Changes to Terms');
  });

  it('should have correct number of sections', () => {
    const compiled = fixture.nativeElement;
    const sections = compiled.querySelectorAll('section');

    // Should have 9 sections (1, 3-10, excluding the commented out sections 2 and 11)
    expect(sections.length).toBe(9);
  });

  it('should contain Andy Grails branding in content', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;

    expect(content).toContain('Andy Grails');
    expect(content).toContain('andy-grails.de');
  });

  it('should contain proper legal language', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.textContent;

    expect(content).toContain('copyright');
    expect(content).toContain('intellectual property');
    expect(content).toContain('terms and conditions');
    expect(content).toContain('Disclaimer');
    expect(content).toContain('liability');
  });
});
