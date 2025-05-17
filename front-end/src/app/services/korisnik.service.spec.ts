import { TestBed } from '@angular/core/testing';

import { KorisnikService } from './korisnik.service';

describe('KorisnikService', () => {
  let service: KorisnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KorisnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
