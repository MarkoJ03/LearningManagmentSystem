import { TestBed } from '@angular/core/testing';

import { GodinaStudijaService } from './godina-studija.service';

describe('GodinaStudijaService', () => {
  let service: GodinaStudijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GodinaStudijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
