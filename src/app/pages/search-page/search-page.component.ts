import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IRequestProfiles from 'src/app/models/IRequest';
import { IProfile, Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  profiles: Profile[] = [];

  subscribedIds: number[] = [];
  ownId: number;

  constructor(private searchService: SearchService, private profileService: ProfileService) { }

  form = new FormGroup({
    userName: new FormControl('')
  })

  ngOnInit(): void {
    this.profileService.getOwnProfile().subscribe({
      next: (ownProfile: Profile) => {
        this.subscribedIds = ownProfile.subscriptionIds;
        this.ownId = ownProfile.id;

      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    })

    this.searchService.getProfiles(14).subscribe( {
      next: (profiles : IProfile[]) => {
        this.profiles = profiles;
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      }
    });

  }

  /* Removes error from input if user start to interact with input field */
  onChange() { this.form.controls.userName.setErrors({ notValid: false })}

  /* Triggers search for specific user */
  onSubmit() {
    const value = this.form.controls.userName.value ?? ''
    let [firstName, lastName] = value.split(' ');

    if (lastName == undefined) lastName = '';

    if (value.split(' ').length > 2) {
      this.form.controls.userName.setErrors({ notValid: true })
      return;
    }

    let requestParams: IRequestProfiles = {firstName, lastName};

    this.searchService.getSpecificProfiles(requestParams).subscribe( (response: IProfile[]) => {
      this.profiles = response
    })
  }

}
