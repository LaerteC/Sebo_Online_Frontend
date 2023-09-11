import { Component, Input, OnInit } from '@angular/core';
import { IProfile, IUser, Profile } from 'src/app/models/Profile';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-search-user-card',
  templateUrl: './search-user-card.component.html',
  styleUrls: ['./search-user-card.component.css']
})
export class SearchUserCardComponent implements OnInit {

  isSubscribed: boolean = false

  @Input()
  profile: Profile = new Profile();

  @Input()
  subscribedIds: number[];

  @Input()
  ownId: number;

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.isSubscribed = this.subscribedIds.includes(this.profile.id)
  }

  onSubscribe() {
    this.subscriptionService.subscribeProfile(this.profile.id).subscribe( {
      next: (response) => {
        this.isSubscribed = true;
      }
    })
  }

  onUnsubscribe() {
    this.subscriptionService.unsubscribeProfile(this.profile.id).subscribe( {
      next: (response) => {
        this.isSubscribed = false;
      }
    })
  }

}
