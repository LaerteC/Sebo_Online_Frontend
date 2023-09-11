import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IImage } from 'src/app/models/IImage';
import { IProfile } from 'src/app/models/Profile';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.css']
})
export class PhotosPageComponent implements OnInit {
  
  photoUrls: string[] = [];
  isEditable = false;

  constructor(private imageService: ImageService, private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route
        .queryParams
        .subscribe((response) => {
          if (response['id'] !== undefined)
            this.queryIdProvided(response['id']);
          else 
            this.queryIdNotProvided();
        })
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [image]: File[] = e.target.files;

      reader.readAsDataURL(image);

      reader.onload = () => {
        this.imageService.uploadImage(this.decompressImage(reader.result)).subscribe({
          next: (response : any) => {
            let url = `${environment.baseUrl}/image/${response.id}`;
            this.photoUrls.unshift(url);
       
            this.profileService.updatePhotos(url).subscribe( (response) => {
              console.log(response)
            })
          }
        })
      }
    }
  }

  private decompressImage(image: string | ArrayBuffer | null) {
    let imageFormat: string [];
    let formattedImage: IImage = { type: '', content: ''};

    if (typeof(image) == 'string') {
      imageFormat  = (image.split(';'));

      imageFormat[0] = imageFormat[0].replace(/data:/g, '');
      imageFormat[1] = imageFormat[1].replace(/base64,/g, '');

      formattedImage = { type: imageFormat[0], content: imageFormat[1]};
    }

    return formattedImage;
  }

  queryIdProvided(id: number) {
    this.profileService.getProfile(id).subscribe((profile : IProfile) => {
      this.photoUrls = profile.photoUrls ?? [];
      this.isEditable = false;
    })
  }

  queryIdNotProvided() {
    this.profileService.getOwnProfile().subscribe((profile: IProfile) => {
      this.photoUrls = profile.photoUrls ?? [];
      this.isEditable = true;
    })
  }

  onDeletePhoto(photoUrl: any) {
    console.log()
    this.photoUrls = this.photoUrls.filter(url => url != photoUrl);
  }
}
