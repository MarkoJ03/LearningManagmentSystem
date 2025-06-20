import { TestBed } from '@angular/core/testing';

import { BibliotekaKnjigaService } from './biblioteka-knjiga.service';

describe('BibliotekaKnjigaService', () => {
  let service: BibliotekaKnjigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliotekaKnjigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
