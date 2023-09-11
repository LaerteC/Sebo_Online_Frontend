import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ImageService(httpSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
