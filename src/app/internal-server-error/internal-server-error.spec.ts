import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { InternalServerErrorComponent } from './internal-server-error';

describe('InternalServerErrorComponent', () => {
  let component: InternalServerErrorComponent;
  let fixture: ComponentFixture<InternalServerErrorComponent>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const routerSpy = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [InternalServerErrorComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(InternalServerErrorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button that leads back home', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('.home-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Back to Home');

    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
