import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableSideDrawerComponent } from './reusable-side-drawer.component';

describe('ReusableSideDrawerComponent', () => {
  let component: ReusableSideDrawerComponent;
  let fixture: ComponentFixture<ReusableSideDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusableSideDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableSideDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
