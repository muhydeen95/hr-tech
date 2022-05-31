import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiletraSkeletonLoaderComponent } from './filetra-skeleton-loader.component';

describe('FiletraSkeletonLoaderComponent', () => {
  let component: FiletraSkeletonLoaderComponent;
  let fixture: ComponentFixture<FiletraSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiletraSkeletonLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiletraSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
