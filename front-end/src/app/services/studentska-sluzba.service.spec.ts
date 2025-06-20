import { TestBed } from '@angular/core/testing';

import { StudentskaSluzbaService } from './studentska-sluzba.service';

describe('StudentskaSluzbaService', () => {
  let service: StudentskaSluzbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentskaSluzbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
