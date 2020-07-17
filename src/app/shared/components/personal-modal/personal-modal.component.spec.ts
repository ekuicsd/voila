import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalModalComponent } from './personal-modal.component';

describe('PersonalModalComponent', () => {
  let component: PersonalModalComponent;
  let fixture: ComponentFixture<PersonalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
