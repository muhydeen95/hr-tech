import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSponsorDialogComponent } from './add-sponsor-dialog.component';

describe('AddSponsorDialogComponent', () => {
  let component: AddSponsorDialogComponent;
  let fixture: ComponentFixture<AddSponsorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSponsorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSponsorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
