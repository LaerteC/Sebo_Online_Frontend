import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IChangePassword, IGeneralInformation, IProfile, IProfileEducation, IProfileLocation, IProfileMaritalStatus, IProfileWork } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl: string = `${environment.baseUrl}/profile`;
  private headers = {headers: environment.headers, withCredentials: environment.withCredentials};

  constructor(private http: HttpClient) {}

  getOwnProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.profileUrl}`, this.headers);
  }

  getProfile(id: number): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.profileUrl}/${id}`, this.headers);
  }

  changePassword(changePassword: IChangePassword): Observable<any> {
    return this.http.post<IChangePassword>(`${this.profileUrl}/change-password`, changePassword, this.headers);
  }


  getGeneralInformation(): Observable<IGeneralInformation> {
    return this.http.get<IGeneralInformation>(`${this.profileUrl}/general-information`, this.headers);
  }

  updateGeneralInformation(generalInformation: IGeneralInformation) {
    return this.http.post<IGeneralInformation>(`${this.profileUrl}/general-information`, generalInformation, this.headers)
  }


  getProfileLocation(): Observable<IProfileLocation> {
    return this.http.get<IProfileLocation>(`${this.profileUrl}/profile-location`, this.headers);
  }

  updateProfileLocation(profileLocation: IProfileLocation): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.profileUrl}/profile-location`, profileLocation, this.headers)
  }


  
  getProfileEducation(): Observable<IProfileEducation> {
    return this.http.get<IProfileEducation>(`${this.profileUrl}/profile-education`, this.headers);
  }

  updateProfileEducation(profileEducation: IProfileEducation): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.profileUrl}/profile-education`, profileEducation, this.headers)
  }

  getProfileWork(): Observable<IProfileWork> {
    return this.http.get<IProfileWork>(`${this.profileUrl}/profile-work`, this.headers);
  }

  updateProfileWork(profileWork: IProfileWork): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.profileUrl}/profile-work`, profileWork, this.headers)
  }


  getProfileMaritalStatus(): Observable<IProfileMaritalStatus> {
    return this.http.get<IProfileMaritalStatus>(`${this.profileUrl}/profile-marital-status`, this.headers);
  }

  updateProfileMaritalStatus(profileMaritalStatus: IProfileMaritalStatus): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.profileUrl}/profile-marital-status`, profileMaritalStatus, this.headers);
  }

  updateProfileBackground(url: string): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.profileUrl}/profile-background`, {url}, this.headers);
  } 

  updateProfileAvatar(url: string): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.profileUrl}/profile-avatar`, {url}, this.headers);
  }

  getAllProfilesByIds(profilesIds: number[], limit?: number, shuffle?: boolean): Observable<IProfile[]> {
  
    let params = new HttpParams().set('ids', profilesIds.sort().join(','))
                                 .set('limit', limit ?? -1)
                                 .set('shuffle', shuffle ?? false);

    return this.http.get<IProfile[]>(`${this.profileUrl}/all`, { ...this.headers, params})
  }

  updatePhotos(url: string) {
    return this.http.put<IProfile>(`${this.profileUrl}/update-photos`, { url }, this.headers);
  }

  removePhoto(url: string) {
    return this.http.patch<IProfile>(`${this.profileUrl}/update-photos`, {url}, this.headers);
  }

}
