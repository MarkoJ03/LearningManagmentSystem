import { TestBed } from '@angular/core/testing';

import { IspitniRokService } from './ispitni-rok.service';

describe('IspitniRokService', () => {
  let service: IspitniRokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IspitniRokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
