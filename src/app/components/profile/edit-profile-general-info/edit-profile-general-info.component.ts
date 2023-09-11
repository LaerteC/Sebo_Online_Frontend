import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IGeneralInformation, IProfile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile-general-info',
  templateUrl: './edit-profile-general-info.component.html',
  styleUrls: ['./edit-profile-general-info.component.css']
})
export class EditProfileGeneralInfoComponent implements OnInit, OnDestroy {

  @Output()
  outputProfile: EventEmitter<IProfile> = new EventEmitter();

  hasResponse: boolean = false;
  hasError: boolean = false;
  responseMessage: string = "";

  constructor(private profileService: ProfileService) {}
  
  ngOnInit(): void {
    this.profileService.getGeneralInformation().subscribe( (response: IGeneralInformation) => {
      this.form.controls.firstName.setValue(response.firstName);
      this.form.controls.lastName.setValue(response.lastName);
      this.form.controls.gender.setValue(response.gender);
      this.form.controls.dob.setValue(response.dob);
      this.form.controls.email.setValue(response.email);
      this.form.controls.phoneNumber.setValue(response.phoneNumber);
    })
  }

  form = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    gender: new FormControl<string>(''),
    dob: new FormControl<string>(''),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl<string>('', Validators.minLength(10))
  });

  submit() {
    this.hasResponse = false;
    this.responseMessage = "";

    if (this.form.valid) {
      const generalInformation: IGeneralInformation = {
        firstName: this.form.value.firstName ? this.form.value.firstName : '',
        lastName: this.form.value.lastName ? this.form.value.lastName : '',
        gender: this.form.value.gender ? this.form.value.gender : '',
        dob: this.form.value.dob ? this.form.value.dob : '',
        email: this.form.value.email!,
        phoneNumber: this.form.value.phoneNumber ? this.form.value.phoneNumber : ''
      }

      this.profileService.updateGeneralInformation(generalInformation).subscribe({
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

  ngOnDestroy(): void {
   
  }
}
