import { TestBed } from '@angular/core/testing';

import { PredmetRealizacijePredmetaService } from './predmet-realizacije-predmeta.service';

describe('PredmetRealizacijePredmetaService', () => {
  let service: PredmetRealizacijePredmetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredmetRealizacijePredmetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
