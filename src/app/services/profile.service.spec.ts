import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { IProfile, IChangePassword, Profile, IGeneralInformation, IProfileLocation, IProfileEducation, IProfileWork, IProfileMaritalStatus } from '../models/Profile'
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('ProfileService', () => {
  let profileService: ProfileService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let profile = new Profile();

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient',['get','post', 'put', 'patch']);
    profileService = new ProfileService(httpSpy);
  });

  it('should be created', () => {
    expect(profileService).toBeTruthy();
  });

  it('should call http client in getOwnProfile', () => {
    profileService.getOwnProfile();
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in getProfile', () => {
    profileService.getProfile(0);
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in getOwnProfile', () => {
    let cp: IChangePassword = {
      oldPassword: "",
      newPassword: ""
    }
    profileService.changePassword(cp);
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in getGeneralInformation', () => {
    profileService.getGeneralInformation();
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in updateGeneralInformation', () => {
    let gi: IGeneralInformation = {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phoneNumber: "",
      gender: "",
    }
    profileService.updateGeneralInformation(gi);
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in getProfileLocation', () => {
    profileService.getProfileLocation();
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in updateProfileLocation', () => {
    let testval: IProfileLocation = {
      currentCity: "",
      currentCountry: "",
      bornCity: "",
      bornCountry: "",
    }
    profileService.updateProfileLocation(testval);
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in getProfileEducation', () => {
    profileService.getProfileEducation();
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in updateProfileEducation', () => {
    let testval: IProfileEducation = {
      schoolName: "",
    }
    profileService.updateProfileEducation(testval);
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in getProfileWork', () => {
    profileService.getProfileWork();
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in updateProfileWork', () => {
    let testval: IProfileWork = {
      jobTitle: "",
      companyName: "",
      companyUrl: "",
    }
    profileService.updateProfileWork(testval);
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in getProfileMaritalStatus', () => {
    profileService.getProfileMaritalStatus();
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in updateProfileMaritalStatus', () => {
    let testval: IProfileMaritalStatus = {
      maritalStatus: ""
    }
    profileService.updateProfileMaritalStatus(testval);
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in updateProfileBackground', () => {
    profileService.updateProfileBackground("");
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in updateProfileAvatar', () => {
    profileService.updateProfileAvatar("");
    expect(httpSpy.post).toHaveBeenCalled();
  });

  it('should call http client in getProfileMaritalStatus', () => {
    profileService.getAllProfilesByIds([]);
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it('should call http client in updatePhotos', () => {
    profileService.updatePhotos("");
    expect(httpSpy.put).toHaveBeenCalled();
  });

  it('should call http client in removePhoto', () => {
    profileService.removePhoto("");
    expect(httpSpy.patch).toHaveBeenCalled();
  });

});
