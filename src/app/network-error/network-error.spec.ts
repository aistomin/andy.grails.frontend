import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkError } from './network-error';

describe('NetworkError', () => {
  let component: NetworkError;
  let fixture: ComponentFixture<NetworkError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
