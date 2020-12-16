import { TestBed } from '@angular/core/testing';

import { ItemManagementStoreService } from './item-management-store.service';

describe('ItemManagementStoreService', () => {
  let service: ItemManagementStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemManagementStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
