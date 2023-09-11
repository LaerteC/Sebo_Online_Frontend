import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

import { PostCreateComponent } from './post-create.component';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let authServiceStub: Partial<AuthService>;
  let postServiceSpy: jasmine.SpyObj<PostService>
  postServiceSpy = jasmine.createSpyObj('PostService',['upsertPost'])
  let user = new User(0,"","","") 
  let post = new Post(1000,"","",0,user,[])

  authServiceStub = {
    currentUser: user
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatFormFieldModule, MatInputModule, BrowserAnimationsModule ],
      declarations: [ PostCreateComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: PostService, useValue: postServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add post to inputPosts', () => {
    postServiceSpy.upsertPost.and.returnValue(of(post))
    let mock = {preventDefault(){}};
    component.submitPost(mock);
    expect(component.inputPosts.length).toEqual(1);
  });

  it('should set profanity true on error', () => {
    postServiceSpy.upsertPost.and.returnValue(throwError({error:"profanity"}))
    let mock = {preventDefault(){}};
    component.submitPost(mock);
    expect(component.profanity).toBeTruthy();
  });

  it('should toggle profanity', () => {
    component.profanity = true;
    component.toggleProfanity();
    expect(component.profanity).toEqual(false);
  });
});
