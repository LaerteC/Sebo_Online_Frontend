import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { defer, Observable, of, throwError } from 'rxjs';
import { IProfile, IProfileEducation } from 'src/app/models/Profile';
import User from 'src/app/models/User';
import { ProfileService } from 'src/app/services/profile.service';

import { EditProfileEducationComponent } from './edit-profile-education.component';

describe('EditProfileEducationComponent', () => {
  let component: EditProfileEducationComponent;
  let fixture: ComponentFixture<EditProfileEducationComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>
  profileServiceSpy = jasmine.createSpyObj('ProfileService', ['updateProfileEducation', 'getProfileEducation']);
  let profileEducation: IProfileEducation = {
    schoolName: ''
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
      declarations: [ EditProfileEducationComponent ],
      providers: [
        {provide: ProfileService, useValue: profileServiceSpy}
      ]
    })
    .compileComponents();

    profileServiceSpy.getProfileEducation.and.returnValue(of(profileEducation));
    fixture = TestBed.createComponent(EditProfileEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hasResponse on response', () => {
    profileServiceSpy.updateProfileEducation.and.returnValue(of(profile));
    component.submit();
    expect(component.hasResponse).toBeTruthy();
  });

  it('should set hasError on error', () => {
    profileServiceSpy.updateProfileEducation.and.returnValue(throwError("message"));
    component.submit();
    expect(component.hasError).toBeTruthy();
  });
});
