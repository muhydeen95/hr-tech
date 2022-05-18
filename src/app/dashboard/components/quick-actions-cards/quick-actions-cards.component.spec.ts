import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActionsCardsComponent } from './quick-actions-cards.component';

describe('QuickActionsCardsComponent', () => {
  let component: QuickActionsCardsComponent;
  let fixture: ComponentFixture<QuickActionsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickActionsCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickActionsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
