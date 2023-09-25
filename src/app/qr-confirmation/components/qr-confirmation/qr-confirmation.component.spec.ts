import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrConfirmationComponent } from './qr-confirmation.component';

describe('QrConfirmationComponent', () => {
  let component: QrConfirmationComponent;
  let fixture: ComponentFixture<QrConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
