import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProfile, IProfileLocation } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile-location',
  templateUrl: './edit-profile-location.component.html',
  styleUrls: ['./edit-profile-location.component.css']
})
export class EditProfileLocationComponent implements OnInit {
  
  @Output()
  outputProfile: EventEmitter<IProfile> = new EventEmitter();

  hasResponse: boolean = false;
  hasError: boolean = false;
  responseMessage: string = "";

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfileLocation().subscribe( (response) => {
      this.form.controls.currentCity.setValue(response.currentCity);
      this.form.controls.currentCountry.setValue(response.currentCountry);
      this.form.controls.bornCity.setValue(response.bornCity);
      this.form.controls.bornCountry.setValue(response.bornCountry);
    })
  }

  form = new FormGroup({
    currentCity: new FormControl<string>('', Validators.required),
    currentCountry: new FormControl<string>('',Validators.required),
    bornCity: new FormControl<string>('',Validators.required),
    bornCountry: new FormControl<string>('',Validators.required),
  });

  submit() {
    this.hasResponse = false;
    this.responseMessage = "";

    if (this.form.valid) {
      const profileLocation: IProfileLocation = {
        currentCity: this.form.value.currentCity ? this.form.value.currentCity : '',
        currentCountry: this.form.value.currentCountry ? this.form.value.currentCountry : '',
        bornCity: this.form.value.bornCity ? this.form.value.bornCity : '',
        bornCountry: this.form.value.bornCountry ? this.form.value.bornCountry : '',
      }

      this.profileService.updateProfileLocation(profileLocation).subscribe({
        next: (response: any) => {
          this.hasResponse = true;
          this.responseMessage = response.message;
          this.outputProfile.emit(response.entity);
        },
        error: (errorResponse) => {
          this.hasResponse = true;
          this.hasError = true;
          this.responseMessage = errorResponse.error;
        }
      })
    }
  }
}
