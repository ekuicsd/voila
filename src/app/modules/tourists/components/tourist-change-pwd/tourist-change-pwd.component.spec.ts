import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristChangePwdComponent } from './tourist-change-pwd.component';

describe('TouristChangePwdComponent', () => {
  let component: TouristChangePwdComponent;
  let fixture: ComponentFixture<TouristChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristChangePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
