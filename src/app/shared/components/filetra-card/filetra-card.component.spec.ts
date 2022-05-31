import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiletraCardComponent } from './filetra-card.component';

describe('FiletraCardComponent', () => {
  let component: FiletraCardComponent;
  let fixture: ComponentFixture<FiletraCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiletraCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiletraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
