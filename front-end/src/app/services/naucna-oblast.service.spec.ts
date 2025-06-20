import { TestBed } from '@angular/core/testing';

import { NaucnaOblastService } from './naucna-oblast.service';

describe('NaucnaOblastService', () => {
  let service: NaucnaOblastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaucnaOblastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
