import { TestBed } from '@angular/core/testing';

import { RealizacijaPredmetaService } from './realizacija-predmeta.service';

describe('RealizacijaPredmetaService', () => {
  let service: RealizacijaPredmetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealizacijaPredmetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
