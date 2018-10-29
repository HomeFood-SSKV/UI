import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefFeedbackComponent } from './chef-feedback.component';

describe('ChefFeedbackComponent', () => {
  let component: ChefFeedbackComponent;
  let fixture: ComponentFixture<ChefFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
