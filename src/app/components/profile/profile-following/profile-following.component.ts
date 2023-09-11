import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProfile, Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.component.html',
  styleUrls: ['./profile-following.component.css']
})
export class ProfileFollowingComponent implements OnInit, OnDestroy {

  clearSubscription: Subscription;

  @Input()
  followersIds: number[] = [];
  
  profiles: Profile[];

  constructor(private profileService: ProfileService, public router: Router) { }

  ngOnInit(): void {}

  /* Runs every time when new data comes to the component */
  ngOnChanges() {
    if (!(this.followersIds.length == 0)) {

      this.clearSubscription = this.profileService.getAllProfilesByIds(this.followersIds, 6, true).subscribe((response : IProfile[]) => {
        this.profiles = response
      })
    }
  }

  ngOnDestroy(): void {
    //this.clearSubscription.unsubscribe();
  }

}
