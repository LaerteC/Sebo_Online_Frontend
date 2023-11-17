import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl: string = `${environment.baseUrl}/post`

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  upsertPost(post: Post): Observable<any> {
    return this.http.put<Post>(`${this.postUrl}`, post, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  upsertComment(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}/comment`, post, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  userPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/${id}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/one/${id}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.postUrl}/${id}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  getAllSubscribedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/subscribed`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }


  //Filtrar Por Categorias usando um GET
  getPostByCategory(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}/category/${category}`, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  updatePostVisibilityOnBackend(postId: number, isVisible: boolean): Observable<Post> {
    return this.http.put<Post>(`${this.postUrl}/flag/${postId}`, {isVisible: isVisible}, {
      headers: environment.headers,
      withCredentials: environment.withCredentials
    })
  }

  exchangeBook(postId: number, idOwner: number): Observable<Post> {
    const headers = new HttpHeaders(environment.headers); // Certifique-se de ter o cabeçalho correto aqui
    const body = {
      postId: postId,
      idOwner: idOwner
    };

    return this.http.post<Post>(`${this.postUrl}/troca`, body, {
      headers,
      withCredentials: environment.withCredentials
    });
  }

}
