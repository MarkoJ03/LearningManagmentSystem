import { TestBed } from '@angular/core/testing';

import { InventarService } from './inventar.service';

describe('InventarService', () => {
  let service: InventarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
