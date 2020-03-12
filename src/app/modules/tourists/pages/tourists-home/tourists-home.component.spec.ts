import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristsHomeComponent } from './tourists-home.component';

describe('TouristsHomeComponent', () => {
  let component: TouristsHomeComponent;
  let fixture: ComponentFixture<TouristsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
