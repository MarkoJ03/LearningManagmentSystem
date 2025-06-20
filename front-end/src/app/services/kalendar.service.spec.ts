import { TestBed } from '@angular/core/testing';

import { KalendarService } from './kalendar.service';

describe('KalendarService', () => {
  let service: KalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
