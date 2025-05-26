import { TestBed } from '@angular/core/testing';

import { SvObrazacService } from './sv-obrazac.service';

describe('SvObrazacService', () => {
  let service: SvObrazacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvObrazacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
