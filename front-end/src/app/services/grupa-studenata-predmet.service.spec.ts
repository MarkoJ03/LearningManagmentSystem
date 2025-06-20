import { TestBed } from '@angular/core/testing';

import { GrupaStudenataPredmetService } from './grupa-studenata-predmet.service';

describe('GrupaStudenataPredmetService', () => {
  let service: GrupaStudenataPredmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupaStudenataPredmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
