import { TestBed } from '@angular/core/testing';

import { DepartmanNastavnikService } from './departman-nastavnik.service';

describe('DepartmanNastavnikService', () => {
  let service: DepartmanNastavnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmanNastavnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
