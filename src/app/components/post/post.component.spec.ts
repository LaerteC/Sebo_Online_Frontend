import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { defer, Observable, of } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { VoteButtonComponent } from '../shared/vote-button/vote-button.component';

import { PostComponent } from './post.component';

@Component({
  selector: 'app-vote-button',
  template: ''
})
class MockVoteButtonComponent{
  @Input('post') post: Post;
}

@Component({
  selector: 'app-post-delete-button',
  template: ''
})
class MockPosteDeleteButtonComponent{
  @Input('post') post: Post;
}

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postServiceStub: Partial<PostService>;
  let authServiceStub: Partial<AuthService>;

  postServiceStub = {
    upsertPost(post: Post): Observable<any>{
      return of(post);
    }
  }

  authServiceStub = {
    currentUser: new User(0,"","","")
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule, RouterTestingModule],
      declarations: [ PostComponent, MockVoteButtonComponent, MockPosteDeleteButtonComponent ],
      providers:[
        {provide: PostService, useValue: postServiceStub},
        {provide: AuthService, useValue: authServiceStub}
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    let user = new User(0,"","","");
    component.post = new Post(0,"","",0,user,[]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleReply on successful submission',()=>{
    let oldVal = component.replyToPost;
    let mock = {preventDefault(){}};
    component.submitReply(mock);
    expect(component.replyToPost).toEqual(!oldVal);

  });
});
