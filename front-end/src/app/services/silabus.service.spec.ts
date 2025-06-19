import { TestBed } from '@angular/core/testing';

import { SilabusService } from './silabus.service';

describe('SilabusService', () => {
  let service: SilabusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilabusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
