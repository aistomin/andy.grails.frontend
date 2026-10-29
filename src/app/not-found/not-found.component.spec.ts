import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const routerSpy = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the not found message', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('404');
    expect(compiled.textContent).toContain('Page Not Found');
  });

  it('should have a button that leads back home', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.actions .btn-primary');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Back to Home');

    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
