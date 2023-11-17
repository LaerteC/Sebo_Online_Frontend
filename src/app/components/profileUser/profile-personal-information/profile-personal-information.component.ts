import { Component, Input } from '@angular/core';
import { IProfilePersonalInfo, ProfilePersonalInfo } from 'src/app/models/ProfilePersonalInfo';

@Component({
  selector: 'app-profile-personal-information',
  templateUrl: './profile-personal-information.component.html',
  styleUrls: ['./profile-personal-information.component.css']
})
export class ProfilePersonalInformationComponent {

  @Input()
  profilePersonalInfo: ProfilePersonalInfo = new ProfilePersonalInfo();

  constructor() {}

}
