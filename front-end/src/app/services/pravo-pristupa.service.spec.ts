import { TestBed } from '@angular/core/testing';

import { PravoPristupaService } from './pravo-pristupa.service';

describe('PravoPristupaService', () => {
  let service: PravoPristupaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PravoPristupaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
