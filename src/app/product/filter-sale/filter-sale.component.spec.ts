import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSaleComponent } from './filter-sale.component';

describe('FilterSaleComponent', () => {
  let component: FilterSaleComponent;
  let fixture: ComponentFixture<FilterSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
