import { TestBed } from '@angular/core/testing';

import { OptometryService } from './optometry.service';

describe('OptometryService', () => {
  let service: OptometryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptometryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
