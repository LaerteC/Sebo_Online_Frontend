import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-photos-page-images',
  templateUrl: './photos-page-images.component.html',
  styleUrls: ['./photos-page-images.component.css']
})
export class PhotosPageImagesComponent implements OnInit {

  @Input()
  isEditable = false;

  showDelete = false;

  @Input()
  photo: string;

  @Output()
  removedElement: EventEmitter<String> = new EventEmitter();

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  onPhotoDelete() {
    this.profileService.removePhoto(this.photo).subscribe({
      next: (response) => {
        this.removedElement.next(this.photo);
      }
    })
  }

}
