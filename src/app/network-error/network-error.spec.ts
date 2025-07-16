import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NetworkErrorComponent } from './network-error';

describe('NetworkErrorComponent', () => {
  let component: NetworkErrorComponent;
  let fixture: ComponentFixture<NetworkErrorComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NetworkErrorComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkErrorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display connection issue message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Connection Issue');
    expect(compiled.textContent).toContain("We couldn't connect to the server");
  });

  it('should have a retry button', () => {
    const compiled = fixture.nativeElement;
    const retryButton = compiled.querySelector('.retry-button');
    expect(retryButton).toBeTruthy();
    expect(retryButton.textContent).toContain('Retry');
  });

  it('should always navigate to home when retry is clicked', () => {
    component.retry();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
