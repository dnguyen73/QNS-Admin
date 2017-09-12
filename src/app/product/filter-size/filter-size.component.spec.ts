import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSizeComponent } from './filter-size.component';

describe('FilterSizeComponent', () => {
  let component: FilterSizeComponent;
  let fixture: ComponentFixture<FilterSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
