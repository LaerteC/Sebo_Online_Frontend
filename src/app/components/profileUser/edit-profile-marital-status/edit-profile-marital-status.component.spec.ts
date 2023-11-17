import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { defer, Observable, of, throwError } from 'rxjs';
import { IProfile, IProfileMaritalStatus } from 'src/app/models/Profile';
import User from 'src/app/models/User';
import { ProfileService } from 'src/app/services/profile.service';

import { EditProfileMaritalStatusComponent } from './edit-profile-marital-status.component';

describe('EditProfileMaritalStatusComponent', () => {
  let component: EditProfileMaritalStatusComponent;
  let fixture: ComponentFixture<EditProfileMaritalStatusComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>
  profileServiceSpy = jasmine.createSpyObj('ProfileService', ['updateProfileMaritalStatus', 'getProfileMaritalStatus']);
  let profileMaritalStatus: IProfileMaritalStatus = {
    maritalStatus: ''
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
      imports: [ MatFormFieldModule, MatSelectModule, BrowserAnimationsModule, ReactiveFormsModule ],
      declarations: [ EditProfileMaritalStatusComponent ],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy }
      ]
    })
    .compileComponents();

    profileServiceSpy.getProfileMaritalStatus.and.returnValue(of(profileMaritalStatus));
    fixture = TestBed.createComponent(EditProfileMaritalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hasResponse on response', () => {
    profileServiceSpy.updateProfileMaritalStatus.and.returnValue(of(profile));
    component.submit();
    expect(component.hasResponse).toBeTruthy();
  });

  it('should set hasError on error', () => {
    profileServiceSpy.updateProfileMaritalStatus.and.returnValue(throwError("message"));
    component.submit();
    expect(component.hasError).toBeTruthy();
  });
});
