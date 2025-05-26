import { TestBed } from '@angular/core/testing';

import { TerminNastaveService } from './termin-nastave.service';

describe('TerminNastaveService', () => {
  let service: TerminNastaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminNastaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
