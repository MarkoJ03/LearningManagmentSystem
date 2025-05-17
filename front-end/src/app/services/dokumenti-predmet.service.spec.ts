import { TestBed } from '@angular/core/testing';

import { DokumentiPredmetService } from './dokumenti-predmet.service';

describe('DokumentiPredmetService', () => {
  let service: DokumentiPredmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DokumentiPredmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
