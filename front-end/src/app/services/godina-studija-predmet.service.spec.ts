import { TestBed } from '@angular/core/testing';

import { GodinaStudijaPredmetService } from './godina-studija-predmet.service';

describe('GodinaStudijaPredmetService', () => {
  let service: GodinaStudijaPredmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GodinaStudijaPredmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
