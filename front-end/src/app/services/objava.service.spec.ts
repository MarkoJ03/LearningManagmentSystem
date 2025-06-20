import { TestBed } from '@angular/core/testing';

import { ObjavaService } from './objava.service';

describe('ObjavaService', () => {
  let service: ObjavaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjavaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
