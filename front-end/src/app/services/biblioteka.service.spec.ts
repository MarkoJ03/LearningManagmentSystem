import { TestBed } from '@angular/core/testing';

import { BibliotekaService } from './biblioteka.service';

describe('BibliotekaService', () => {
  let service: BibliotekaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliotekaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
