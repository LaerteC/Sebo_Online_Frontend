import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { defer, of } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

import { PostFeedPageComponent } from './post-feed-page.component';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavbar{

}

@Component({
  selector: 'app-user-card',
  template: ''
})
class MockUserCard {

}

describe('PostFeedPageComponent', () => {
  let component: PostFeedPageComponent;
  let fixture: ComponentFixture<PostFeedPageComponent>;
  let postServiceStub: Partial<PostService>;
  let authServiceStub: Partial<AuthService>;

  postServiceStub = {
    getAllSubscribedPosts(): Observable<Post[]> {
      let posts: Post[] = [];
      return of(posts);
    },
    upsertPost(post: Post): Observable<any> {
      //return defer(()=>Promise.reject({error: "profanity"}))
      return throwError(()=>{return {error: "profanity"}})
    }
  }

  authServiceStub = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      declarations: [ PostFeedPageComponent, MockNavbar, MockUserCard],
      providers:[
        {provide: PostService, useValue: postServiceStub},
        {provide: AuthService, useValue: authServiceStub}
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('profanity error sets profanity to true',()=> {
    let mock = {preventDefault(){}};
    component.submitPost(mock);
    expect(component.profanity).toBeTruthy();
  });
});
