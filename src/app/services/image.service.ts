import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IImage } from '../models/IImage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  private url: string = `${environment.baseUrl}/image`;
  private headers = {headers: environment.headers, withCredentials: environment.withCredentials};

  constructor(private http: HttpClient) { }

  uploadImage(image: IImage): Observable<string> {
    return this.http.post<string>(`${this.url}`, image, this.headers);
  }
}
