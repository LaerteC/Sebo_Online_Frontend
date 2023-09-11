import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { IProfile, IProfileEducation } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile-education',
  templateUrl: './edit-profile-education.component.html',
  styleUrls: ['./edit-profile-education.component.css']
})
export class EditProfileEducationComponent implements OnInit {

  @Output()
  outputProfile: EventEmitter<IProfile> = new EventEmitter();

  loader: boolean = false;
  hasResponse: boolean = false;
  hasError: boolean = false;
  responseMessage: string = "";

  constructor(private profileService: ProfileService) { }

  
  form = new FormGroup({
    schoolName: new FormControl<string>('',Validators.required),
  });


  ngOnInit(): void {
    this.profileService.getProfileEducation().subscribe( (response) => {
      this.form.controls.schoolName.setValue(response.schoolName)
    })
  }


  submit() {
    this.hasResponse = false;
    this.responseMessage = "";

    if (this.form.valid) {
      const profileEducation: IProfileEducation = {
        schoolName: this.form.value.schoolName ? this.form.value.schoolName : '',
      }

      this.profileService.updateProfileEducation(profileEducation).subscribe({

        next: (response: any) => {
          this.hasResponse = true;
          this.responseMessage = response.message;
          this.outputProfile.emit(response.entity);
        },
        error: (errorResponse) => {
          this.loader = false;
          this.hasResponse = true;
          this.hasError = true;
          this.responseMessage = errorResponse.error;
        }
      })
    }
  }


}
