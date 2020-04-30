import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsCardsComponent } from './deals-cards.component';

describe('DealsCardsComponent', () => {
  let component: DealsCardsComponent;
  let fixture: ComponentFixture<DealsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
