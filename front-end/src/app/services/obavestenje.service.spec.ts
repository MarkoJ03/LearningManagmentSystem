import { TestBed } from '@angular/core/testing';

import { ObavestenjeService } from './obavestenje.service';

describe('ObavestenjeService', () => {
  let service: ObavestenjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObavestenjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
