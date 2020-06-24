import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideChangePwdComponent } from './guide-change-pwd.component';

describe('GuideChangePwdComponent', () => {
  let component: GuideChangePwdComponent;
  let fixture: ComponentFixture<GuideChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideChangePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
