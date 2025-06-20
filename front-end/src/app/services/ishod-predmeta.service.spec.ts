import { TestBed } from '@angular/core/testing';

import { IshodPredmetaService } from './ishod-predmeta.service';

describe('IshodPredmetaService', () => {
  let service: IshodPredmetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IshodPredmetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
