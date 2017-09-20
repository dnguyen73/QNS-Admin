import { TestBed, inject } from '@angular/core/testing';

import { ProductDetailResolveService } from './product-detail-resolve.service';

describe('ProductDetailResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailResolveService]
    });
  });

  it('should be created', inject([ProductDetailResolveService], (service: ProductDetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});
