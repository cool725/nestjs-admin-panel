import { TestBed } from '@angular/core/testing';

import { ItemProductAPI } from './item-product.api';

describe('ItemProductService', () => {
  let service: ItemProductAPI<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemProductAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
