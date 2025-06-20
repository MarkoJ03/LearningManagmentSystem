import { TestBed } from '@angular/core/testing';

import { DrzavaService } from './drzava.service';

describe('DrzavaService', () => {
  let service: DrzavaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrzavaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
