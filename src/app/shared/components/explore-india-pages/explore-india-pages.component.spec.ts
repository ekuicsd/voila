import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreIndiaPagesComponent } from './explore-india-pages.component';

describe('ExploreIndiaPagesComponent', () => {
  let component: ExploreIndiaPagesComponent;
  let fixture: ComponentFixture<ExploreIndiaPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreIndiaPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreIndiaPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
