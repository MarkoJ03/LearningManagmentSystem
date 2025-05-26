import { TestBed } from '@angular/core/testing';

import { EvaluacijaZnanjaService } from './evaluacija-znanja.service';

describe('EvaluacijaZnanjaService', () => {
  let service: EvaluacijaZnanjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacijaZnanjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
