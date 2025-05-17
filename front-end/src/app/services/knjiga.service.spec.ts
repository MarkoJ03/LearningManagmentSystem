import { TestBed } from '@angular/core/testing';

import { KnjigaService } from './knjiga.service';

describe('KnjigaService', () => {
  let service: KnjigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnjigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
