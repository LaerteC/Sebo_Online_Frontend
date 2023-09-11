import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import IRequest from '../models/IRequest';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  httpSpy = jasmine.createSpyObj('HttpClient',['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new SearchService(httpSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client in getProfiles', () => {
    service.getProfiles(10);
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in getSpecificProfiles', () => {
    let testval: IRequest = {
      firstName: "",
      lastName: "",
    }
    service.getSpecificProfiles(testval);
    expect(httpSpy.get).toHaveBeenCalled();
  });
});
