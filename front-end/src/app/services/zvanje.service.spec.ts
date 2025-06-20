import { TestBed } from '@angular/core/testing';

import { ZvanjeService } from './zvanje.service';

describe('ZvanjeService', () => {
  let service: ZvanjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZvanjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
