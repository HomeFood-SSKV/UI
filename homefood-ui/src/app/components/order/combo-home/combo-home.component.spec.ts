import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboHomeComponent } from './combo-home.component';

describe('ComboHomeComponent', () => {
  let component: ComboHomeComponent;
  let fixture: ComponentFixture<ComboHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
