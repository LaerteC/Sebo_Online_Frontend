import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private url: string = `${environment.baseUrl}/subscription`;
  private headers = {headers: environment.headers, withCredentials: environment.withCredentials};

  constructor(private http: HttpClient) { }

  public subscribeProfile(id: number): Observable<any> {
    return this.http.patch(this.url, { id }, this.headers);
  }

  public unsubscribeProfile(id: number): Observable<any> {
    return this.http.patch(`${this.url}/unsubscribe`, { id }, this.headers)
  }
}
