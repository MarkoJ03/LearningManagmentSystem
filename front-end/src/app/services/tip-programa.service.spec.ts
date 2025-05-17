import { TestBed } from '@angular/core/testing';

import { TipProgramaService } from './tip-programa.service';

describe('TipProgramaService', () => {
  let service: TipProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipProgramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
