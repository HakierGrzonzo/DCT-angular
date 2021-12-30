import { TestBed } from '@angular/core/testing';

import { DCTService } from './dct.service';

describe('DCTService', () => {
  let service: DCTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DCTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
