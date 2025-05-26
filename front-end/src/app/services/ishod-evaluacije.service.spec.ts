import { TestBed } from '@angular/core/testing';

import { IshodEvaluacijeService } from './ishod-evaluacije.service';

describe('IshodEvaluacijeService', () => {
  let service: IshodEvaluacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IshodEvaluacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
