import { TestBed } from '@angular/core/testing';

import { KatedraNastavnikService } from './katedra-nastavnik.service';

describe('KatedraNastavnikService', () => {
  let service: KatedraNastavnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatedraNastavnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
