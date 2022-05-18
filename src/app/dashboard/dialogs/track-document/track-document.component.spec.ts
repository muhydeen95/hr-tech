import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDocumentComponent } from './track-document.component';

describe('TrackDocumentComponent', () => {
  let component: TrackDocumentComponent;
  let fixture: ComponentFixture<TrackDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
