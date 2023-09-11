import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProfile, IProfileMaritalStatus } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile-marital-status',
  templateUrl: './edit-profile-marital-status.component.html',
  styleUrls: ['./edit-profile-marital-status.component.css']
})
export class EditProfileMaritalStatusComponent implements OnInit {

  @Output()
  outputProfile: EventEmitter<IProfile> = new EventEmitter();

  hasResponse: boolean = false;
  hasError: boolean = false;
  responseMessage: string = "";

  constructor(private profileService: ProfileService) { }

  
  form = new FormGroup({
    maritalStatus: new FormControl<string>(''),
  });


  ngOnInit(): void {
    this.profileService.getProfileMaritalStatus().subscribe( (response) => {
      this.form.controls.maritalStatus.setValue(response.maritalStatus)
    })
  } 

  submit() {
    this.hasResponse = false;
    this.responseMessage = "";

    if (this.form.valid) {
      const profileMaritalStatus: IProfileMaritalStatus = {
        maritalStatus: this.form.value.maritalStatus ? this.form.value.maritalStatus : '',
      }
      this.profileService.updateProfileMaritalStatus(profileMaritalStatus).subscribe({
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
