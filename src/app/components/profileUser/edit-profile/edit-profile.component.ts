import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IProfile } from 'src/app/models/Profile';

export interface IComponentToShow {
  componentToDisplay: string;
  updateProfile (profile: IProfile): void;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  @Input()
  showComponent = new BehaviorSubject<string>('general information');

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IComponentToShow) {
      
    if (!(this.data == undefined)) {
      this.showComponent.next(data.componentToDisplay);
    }   
  }

  onClick(buttonName : string | PointerEvent) {
    if (buttonName instanceof PointerEvent)
        return;
    else 
      this.showComponent.next(buttonName);
  }

  emitProfile(profile: IProfile) {
    this.data.updateProfile(profile)
  }

}
