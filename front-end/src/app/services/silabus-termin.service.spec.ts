import { TestBed } from '@angular/core/testing';

import { SilabusTerminService } from './silabus-termin.service';

describe('SilabusTerminService', () => {
  let service: SilabusTerminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilabusTerminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
