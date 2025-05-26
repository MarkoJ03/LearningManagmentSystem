import { TestBed } from '@angular/core/testing';

import { TipEvaluacijeService } from './tip-evaluacije.service';

describe('TipEvaluacijeService', () => {
  let service: TipEvaluacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipEvaluacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
