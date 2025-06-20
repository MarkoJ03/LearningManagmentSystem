import { TestBed } from '@angular/core/testing';

import { GradService } from './grad.service';

describe('GradService', () => {
  let service: GradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
