import { TestBed } from '@angular/core/testing';

import { TipNastaveService } from './tip-nastave.service';

describe('TipNastaveService', () => {
  let service: TipNastaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipNastaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
