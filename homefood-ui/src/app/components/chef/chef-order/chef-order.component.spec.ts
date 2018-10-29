import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefOrderComponent } from './chef-order.component';

describe('ChefOrderComponent', () => {
  let component: ChefOrderComponent;
  let fixture: ComponentFixture<ChefOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
