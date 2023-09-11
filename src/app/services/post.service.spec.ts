import { HttpClient } from '@angular/common/http';
import Post from '../models/Post';
import User from '../models/User';
import { PostService } from './post.service';

describe('PostService', () => {
  let postService: PostService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let user = new User(0, "","", "")
  let post = new Post(0, "","",0,user,[])

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient',['get','put', 'delete']);
    postService = new PostService(httpSpy);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  it('should call http client in getAllPosts', () => {
    postService.getAllPosts();
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in upsertPost', () => {
    postService.upsertPost(post);
    expect(httpSpy.put).toHaveBeenCalled();
  });

  it('should call http client in upsertComment', () => {
    postService.upsertComment(post);
    expect(httpSpy.put).toHaveBeenCalled();
  });

  it('should call http client in userPosts', () => {
    postService.userPosts(0);
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in getPost', () => {
    postService.getPost(0);
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in deletePost', () => {
    postService.deletePost(0);
    expect(httpSpy.delete).toHaveBeenCalled();
  });
  
  it('should call http client in getAllSubscribedPosts', () => {
    postService.getAllSubscribedPosts();
    expect(httpSpy.get).toHaveBeenCalled();
  });

});
