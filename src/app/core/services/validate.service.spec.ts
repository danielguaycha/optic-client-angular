import { TestBed } from '@angular/core/testing';

import { ValidateService } from './validate.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import {ToastService} from './toast.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ValidateService', () => {
  let service: ValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule,
        ToastNotificationsModule],
      providers: [ToastService]
    });
    service = TestBed.inject(ValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
