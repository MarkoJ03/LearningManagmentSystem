import { TestBed } from '@angular/core/testing';

import { DodeljenoPravoPristupaService } from './dodeljeno-pravo-pristupa.service';

describe('DodeljenoPravoPristupaService', () => {
  let service: DodeljenoPravoPristupaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DodeljenoPravoPristupaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
