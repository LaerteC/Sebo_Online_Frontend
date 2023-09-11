import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { defer, Observable } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { Vote } from 'src/app/models/Vote';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { VoteService } from 'src/app/services/vote.service';

import { VoteButtonComponent } from './vote-button.component';
import { VoteType } from './vote-type';

describe('VoteButtonComponent', () => {
  let component: VoteButtonComponent;
  let fixture: ComponentFixture<VoteButtonComponent>;
  let voteServiceSpy: jasmine.SpyObj<VoteService>;
  let authServiceStub: Partial<AuthService>;
  let postServiceStub: Partial<PostService>;
  let user = new User(0,"","","");
  let post = new Post(0,"","",0,user,[]);
  let vote = new Vote(0,VoteType.UPVOTE, post, user);
  voteServiceSpy = jasmine.createSpyObj('VoteService', ['vote', 'checkVote'])

  authServiceStub = {
    currentUser: user
  }

  postServiceStub = {
    getPost(id: number): Observable<Post>{
      return defer(()=>Promise.resolve(post))
    }
  }

  beforeEach(async () => {
    let value: Observable<any> = defer(()=>Promise.resolve(true))
    voteServiceSpy.vote.and.returnValue(value);
    let value2: Observable<Vote> = defer(()=>Promise.resolve(vote))
    voteServiceSpy.checkVote.and.returnValue(value2);

    await TestBed.configureTestingModule({
      imports: [ MatIconModule ],
      declarations: [ VoteButtonComponent ],
      providers: [
        {provide: VoteService, useValue: voteServiceSpy},
        {provide: AuthService, useValue: authServiceStub},
        {provide: PostService, useValue: postServiceStub}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteButtonComponent);
    component = fixture.componentInstance;
    component.post = post;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call voteService vote on upvote',()=>{
    component.upvotePost();
    expect(voteServiceSpy.vote).toHaveBeenCalled();
  });

  it('should call voteService vote on downvote',()=>{
    component.downvotePost();
    expect(voteServiceSpy.vote).toHaveBeenCalled();
  });
});
