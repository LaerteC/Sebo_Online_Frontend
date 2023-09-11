import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IProfile, Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

import { FollowingsPageComponent } from './followings-page.component';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavbar{}

describe('FollowingsPageComponent', () => {
  let component: FollowingsPageComponent;
  let fixture: ComponentFixture<FollowingsPageComponent>;
  let profileServiceStub: Partial<ProfileService>;
  let subscriptionServiceStub: Partial<SubscriptionService>;
  let profile = new Profile();
  //profile.owner.avatarImageUrl = ''
  let profiles:IProfile[] = [];

  profileServiceStub = {
    getOwnProfile(){
      return of(profile);
    },
    getProfile(id: number){
      return of(profile);
    },
    getAllProfilesByIds(ids: number[]){
      return of(profiles);
    }
  }

  subscriptionServiceStub = {
    unsubscribeProfile(ids: number){
      return of(profile);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatDividerModule ],
      declarations: [ FollowingsPageComponent, MockNavbar ],
      providers: [ { provide: ProfileService, useValue: profileServiceStub },
        { provide: SubscriptionService, useValue: subscriptionServiceStub } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isEditable false in IdProvided', () => {
    component.isEditable = true;
    component.queryIdProvided(0);
    expect(component.isEditable).toEqual(false);
  });

  it('should set isEditable true in IdNotProvided', () => {
    component.isEditable = false;
    component.queryIdNotProvided();
    expect(component.isEditable).toEqual(true);
  });

});
