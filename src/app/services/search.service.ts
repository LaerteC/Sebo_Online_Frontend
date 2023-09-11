import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import IRequest from '../models/IRequest';
import { IProfile } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url: string = `${environment.baseUrl}/search`;
  private headers = {headers: environment.headers, withCredentials: environment.withCredentials};
  
  constructor(private http: HttpClient) { }

  getProfiles(limitProfiles?: number): Observable<IProfile[]> {
    let params = new HttpParams();

    if (typeof limitProfiles == "number")
      params = new HttpParams().set('limit', limitProfiles);

    return this.http.get<IProfile[]>(`${this.url}/profiles`, {params: params, ...this.headers});
  }

  getSpecificProfiles(requestParams: IRequest) {
    let params = new HttpParams()
                        .set('firstName', requestParams.firstName)
                        .set('lastName', requestParams.lastName)
    
    return this.http.get<IProfile[]>(`${this.url}/specific-profiles`, {params: params, ...this.headers});
  }
}
