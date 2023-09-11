import { Component, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IProfile, Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-followings-page',
  templateUrl: './followings-page.component.html',
  styleUrls: ['./followings-page.component.css']
})
export class FollowingsPageComponent implements OnInit {

  isEditable = false;

  isSubscribed = true;
  
  profiles: Profile[];

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.route
        .queryParams
        .subscribe( (response) => {
          
          if (response['id'] !== undefined)
            this.queryIdProvided(response['id']);
          else 
            this.queryIdNotProvided();
        })
  }

  queryIdProvided(id: number) {
    this.profileService.getProfile(id).subscribe((profile : IProfile) => {
      this.profileService.getAllProfilesByIds(profile.subscriptionIds).subscribe( (profiles : IProfile[]) => {
        this.isEditable = false;
        this.profiles = profiles;
      })
    })
  }

  queryIdNotProvided() {
    this.profileService.getOwnProfile().subscribe((profile: IProfile) => {
      this.profileService.getAllProfilesByIds(profile.subscriptionIds).subscribe( (profiles : IProfile[]) => {
        this.isEditable = true;
        this.profiles = profiles;
      })
    })
  }

  onUnsubscribe(id: number) {
    this.subscriptionService.unsubscribeProfile(id).subscribe( {
      next: (response) => {
          this.profiles = this.profiles.filter( profile => profile.id != id);
      }
    })
  }

}
