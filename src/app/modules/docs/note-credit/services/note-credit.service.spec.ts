import { TestBed } from '@angular/core/testing';

import { NoteCreditService } from './note-credit.service';

describe('NoteCreditService', () => {
  let service: NoteCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
