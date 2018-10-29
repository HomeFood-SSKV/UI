import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefRegisterComponent } from './chef-register.component';

describe('ChefRegisterComponent', () => {
  let component: ChefRegisterComponent;
  let fixture: ComponentFixture<ChefRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
