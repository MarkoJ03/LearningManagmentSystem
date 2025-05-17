import { TestBed } from '@angular/core/testing';

import { OsobljeService } from './osoblje.service';

describe('OsobljeService', () => {
  let service: OsobljeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsobljeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
