import { TestBed } from '@angular/core/testing';

import { GrupaStudenataService } from './grupa-studenata.service';

describe('GrupaStudenataService', () => {
  let service: GrupaStudenataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupaStudenataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
