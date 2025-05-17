import { TestBed } from '@angular/core/testing';

import { TipZvanjaService } from './tip-zvanja.service';

describe('TipZvanjaService', () => {
  let service: TipZvanjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipZvanjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
