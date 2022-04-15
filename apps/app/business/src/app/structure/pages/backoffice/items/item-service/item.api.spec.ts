import { TestBed } from '@angular/core/testing';
import { ItemServiceAPI } from './item.api';

describe('Item.ServiceService', () => {
  let service: ItemServiceAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemServiceAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
