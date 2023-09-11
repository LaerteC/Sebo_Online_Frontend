import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile-security-settings',
  templateUrl: './edit-profile-security-settings.component.html',
  styleUrls: ['./edit-profile-security-settings.component.css']
})
export class EditProfileSecuritySettingsComponent implements OnDestroy {
  onSubmitSubscription: Subscription;

  hasError: any = {
    oldPassword: false,
    newPassword: false,
    reenteredPassword: false
  }
  isUpdated!:boolean;

  isLoading = false;

  message!: string;

  constructor(private profileService: ProfileService){}

  form = new FormGroup({
    oldPassword: new FormControl<string>('', Validators.required),
    newPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    reenteredPassword: new FormControl<string>('', Validators.required)
  })

  submit() {
    this.isUpdated = false;

    if (this.form.value.newPassword !== this.form.value.reenteredPassword) {
      this.hasError = {...this.hasError, newPassword: true, reenteredPassword: true}
      this.message = "The passwords do not match. Try again."
      return;
    }
    
    Object.keys(this.hasError).forEach( key => { this.hasError[key] = false;})
    this.message = '';

    if (this.form.valid) {
      this.onSubmitSubscription = this.profileService.changePassword({
        oldPassword: this.form.value.oldPassword as string,
        newPassword: this.form.value.newPassword as string
      }).subscribe({
        next: response => {
          this.form.controls.oldPassword.markAsUntouched()
          this.form.controls.newPassword.markAsUntouched()
          this.form.controls.reenteredPassword.markAsUntouched()

          this.isUpdated = true;
          this.message = response.message;

          this.form.reset();

        },
        error: error => {
          this.hasError = {...this.hasError, oldPassword: true};
          this.message = error.error;
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.onSubmitSubscription?.unsubscribe();
  };

}
