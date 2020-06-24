import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHistoryListComponent } from './chat-history-list.component';

describe('ChatHistoryListComponent', () => {
  let component: ChatHistoryListComponent;
  let fixture: ComponentFixture<ChatHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
