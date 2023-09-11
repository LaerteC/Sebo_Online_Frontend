import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, defer, of, throwError } from 'rxjs';
import { IProfile, IProfileWork } from 'src/app/models/Profile';
import User from 'src/app/models/User';
import { ProfileService } from 'src/app/services/profile.service';

import { EditProfileWorkComponent } from './edit-profile-work.component';

describe('EditProfileWorkComponent', () => {
  let component: EditProfileWorkComponent;
  let fixture: ComponentFixture<EditProfileWorkComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>
  profileServiceSpy = jasmine.createSpyObj('ProfileService', ['updateProfileWork', 'getProfileWork']);
  let profileWork: IProfileWork = {
    jobTitle: '',
    companyName: '',
    companyUrl: ''
  }
  let user = new User(0, "","","")
  let profile: IProfile = {
    id: 0,
    backgroundImageUrl: '',
    currentCity: '',
    currentCountry: '',
    bornCity: '',
    bornCountry: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    schoolName: '',
    jobTitle: '',
    companyName: '',
    companyUrl: '',
    phoneNumber: '',
    subscriptionIds: [],
    photoUrls: [],
    owner: user
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatFormFieldModule, MatInputModule, BrowserAnimationsModule, ReactiveFormsModule],
      declarations: [ EditProfileWorkComponent ],
      providers: [
        {provide: ProfileService, useValue: profileServiceSpy}
      ]
    })
    .compileComponents();

    profileServiceSpy.getProfileWork.and.returnValue(of(profileWork));
    fixture = TestBed.createComponent(EditProfileWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hasResponse on response', () => {
    profileServiceSpy.updateProfileWork.and.returnValue(of(profile));
    component.submit();
    expect(component.hasResponse).toBeTruthy();
  });

  it('should set hasError on error', () => {
    profileServiceSpy.updateProfileWork.and.returnValue(throwError("message"));
    component.submit();
    expect(component.hasError).toBeTruthy();
  });
});
