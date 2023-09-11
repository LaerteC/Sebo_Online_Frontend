import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { defer } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

import { ProfileFollowingComponent } from './profile-following.component';

describe('ProfileFollowingComponent', () => {
  let component: ProfileFollowingComponent;
  let fixture: ComponentFixture<ProfileFollowingComponent>;
  let profileServiceStub: Partial<ProfileService>;

  profileServiceStub = {
    getAllProfilesByIds(profilesIds: number[], limit?: number, shuffle?: boolean) {
      let profiles: Profile[] = []
      return defer(()=>Promise.resolve(profiles));
    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatIconModule ],
      declarations: [ ProfileFollowingComponent ],
      providers: [
        {provide: ProfileService, useValue: profileServiceStub}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
