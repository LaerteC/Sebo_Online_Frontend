import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new SubscriptionService(httpSpy);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
