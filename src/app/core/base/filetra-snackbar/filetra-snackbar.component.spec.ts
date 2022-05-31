import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiletraSnackbarComponent } from './filetra-snackbar.component';

describe('FiletraSnackbarComponent', () => {
  let component: FiletraSnackbarComponent;
  let fixture: ComponentFixture<FiletraSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiletraSnackbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiletraSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
