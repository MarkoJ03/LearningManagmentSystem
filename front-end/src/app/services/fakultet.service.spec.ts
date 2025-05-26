import { TestBed } from '@angular/core/testing';

import { FakultetService } from './fakultet.service';

describe('FakultetService', () => {
  let service: FakultetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakultetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
