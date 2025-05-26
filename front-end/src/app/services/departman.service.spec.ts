import { TestBed } from '@angular/core/testing';

import { DepartmanService } from './departman.service';

describe('DepartmanService', () => {
  let service: DepartmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
