import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { IProfile, IProfileWork } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile-work',
  templateUrl: './edit-profile-work.component.html',
  styleUrls: ['./edit-profile-work.component.css']
})
export class EditProfileWorkComponent implements OnInit {
  
  @Output()
  outputProfile: EventEmitter<IProfile> = new EventEmitter();

  hasResponse: boolean = false;
  hasError: boolean = false;
  responseMessage: string = "";

  constructor(private profileService: ProfileService) { }

  form = new FormGroup({
    jobTitle: new FormControl<string>('',Validators.required),
    companyName: new FormControl<string>('',Validators.required),
    companyUrl: new FormControl<string>('',Validators.required)
  });


  ngOnInit(): void {
    this.profileService.getProfileWork().subscribe( (response) => {
       this.form.controls.jobTitle.setValue(response.jobTitle)
       this.form.controls.companyName.setValue(response.companyName)
       this.form.controls.companyUrl.setValue(response.companyUrl)
    })
  }

  submit() {
    this.hasResponse = false;
    this.responseMessage = "";

    if (this.form.valid) {
      const profileWork: IProfileWork = {
        jobTitle: this.form.value.jobTitle ? this.form.value.jobTitle : '',
        companyName: this.form.value.companyName ? this.form.value.companyName : '',
        companyUrl: this.form.value.companyUrl ? this.form.value.companyUrl : ''
      }

      this.profileService.updateProfileWork(profileWork).subscribe({
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
