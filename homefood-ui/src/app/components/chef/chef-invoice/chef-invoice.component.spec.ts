import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefInvoiceComponent } from './chef-invoice.component';

describe('ChefInvoiceComponent', () => {
  let component: ChefInvoiceComponent;
  let fixture: ComponentFixture<ChefInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
