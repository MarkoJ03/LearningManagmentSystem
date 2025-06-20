import { TestBed } from '@angular/core/testing';

import { StudijskiProgramService } from './studijski-program.service';

describe('StudijskiProgramService', () => {
  let service: StudijskiProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudijskiProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
