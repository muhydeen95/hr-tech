import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedDocComponent } from './uploaded-doc.component';

describe('UploadedDocComponent', () => {
  let component: UploadedDocComponent;
  let fixture: ComponentFixture<UploadedDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
