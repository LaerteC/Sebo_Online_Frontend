import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { SearchService } from 'src/app/services/search.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchPageComponent } from './search-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import IRequestProfiles from 'src/app/models/IRequest';
import IRequest from 'src/app/models/IRequest';

@Component({
  selector: 'app-search-user-card',
  template: ''
})
class MockSearchUserCard {}

@Component({
  selector: 'app-search-user-sidebar',
  template: ''
})
class MockSearchUserSidebar {}

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavbar {}

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let searchServiceStub: Partial<SearchService>;
  let profileServiceStub: Partial<ProfileService>;
  let testProfiles = [new Profile()];



  searchServiceStub = {
    getProfiles(limitProfiles: number) {
      let profiles: Profile[] = []
      return of(profiles);
    },
    
    getSpecificProfiles(requestParams: IRequest){
      return of(testProfiles)
    }
  }

  profileServiceStub = {
    getOwnProfile() {
      let profile: Profile = new Profile();
      profile.subscriptionIds = [1000];
      profile.id = 1000;
      return of(profile);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatIconModule, MatFormFieldModule, BrowserAnimationsModule, 
        ReactiveFormsModule, MatInputModule],
      declarations: [ SearchPageComponent, MockSearchUserCard,
         MockNavbar, MockSearchUserSidebar],
      providers: [ { provide: ProfileService, useValue: profileServiceStub },
        { provide: SearchService, useValue: searchServiceStub }
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    let form = new FormGroup({
      userName: new FormControl('')
    })
    component.form = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set ownId', () => {
    expect(component.ownId).toEqual(1000);
  });

  it('should call setErrors in onChange', () => {
    component.form.controls.userName.setErrors({notValid: true});
    component.onChange();
    expect(component.form.controls.userName.getError('notValid')).toEqual(false);
  });

  it('should call service in onSubmit', () => {
    component.form.controls.userName.setValue("test user");
    component.onSubmit();
    expect(component.profiles).toEqual(testProfiles);
  });

  it('should call setErrors in onSubmit with bad name', () => {
    component.form.controls.userName.setValue("bad test user name");
    component.form.controls.userName.setErrors({notValid: false});
    component.onSubmit();
    expect(component.form.controls.userName.getError('notValid')).toEqual(true);
  });
  
});
