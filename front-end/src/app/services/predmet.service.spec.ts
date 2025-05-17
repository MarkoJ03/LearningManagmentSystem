import { TestBed } from '@angular/core/testing';

import { PredmetService } from './predmet.service';

describe('PredmetService', () => {
  let service: PredmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
