import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrTokenDialogComponent } from './qr-token-dialog.component';

describe('QrTokenDialogComponent', () => {
  let component: QrTokenDialogComponent;
  let fixture: ComponentFixture<QrTokenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrTokenDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrTokenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
