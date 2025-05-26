import { TestBed } from '@angular/core/testing';

import { AdresaService } from './adresa.service';

describe('AdresaService', () => {
  let service: AdresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
