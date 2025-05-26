import { TestBed } from '@angular/core/testing';

import { KatedraService } from './katedra.service';

describe('KatedraService', () => {
  let service: KatedraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatedraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
