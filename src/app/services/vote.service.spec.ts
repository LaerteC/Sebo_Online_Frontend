import { HttpClient } from '@angular/common/http';
import { VoteService } from './vote.service';
import { AuthService } from './auth.service';

describe('VoteService', () => {
  let voteService: VoteService;
  let authService: AuthService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient',['post']);

    voteService = new VoteService(httpSpy, authService);
  });

  it('should be created', () => {
    expect(voteService).toBeTruthy();
  });
});
