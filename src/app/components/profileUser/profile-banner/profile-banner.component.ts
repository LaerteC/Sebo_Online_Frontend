import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';
import {IImage} from 'src/app/models/IImage';
import {IProfile} from 'src/app/models/Profile';
import {IProfileHeroBanner} from 'src/app/models/ProfileHeroBanner';
import {AuthService} from 'src/app/services/auth.service';
import {ImageService} from 'src/app/services/image.service';
import {ProfileService} from 'src/app/services/profile.service';
import {environment} from 'src/environments/environment';
import {EditProfileComponent} from '../edit-profile/edit-profile.component';

@Component({
    selector: 'app-profile-banner',
    templateUrl: './profile-banner.component.html',
    styleUrls: ['./profile-banner.component.css']
})
export class ProfileBannerComponent implements OnInit {
    isAvatarUploadShown: boolean = false;

    @Input()
    updateProfile(profile: IProfile): void {
    };

    @Input()
    isEditable: boolean = false;

    @Input()
    heroBannerInformation: IProfileHeroBanner;

    constructor(private dialog: MatDialog, private imageService: ImageService, private profileService: ProfileService) {
    }

    ngOnInit(): void {
    }

    openDialog() {
        this.dialog.open(EditProfileComponent, {
            data: {
                componentToDisplay: "general information",
                updateProfile: this.updateProfile
            }
        });
    }

    onImageChange(e: any, elementToUpdate: string) {
        const reader = new FileReader();

        if (e.target.files && e.target.files.length) {
            const [image]: File[] = e.target.files;

            reader.readAsDataURL(image);

            reader.onload = () => {
                this.imageService.uploadImage(this.decompressImage(reader.result)).subscribe({
                    next: (response: any) => {
                        let url = `${environment.baseUrl}/image/${response.id}`;

                        if (elementToUpdate == 'background') {
                            this.heroBannerInformation.backgroundImageUrl = url;

                            /* Update profile's background URL to a new one */
                            this.profileService.updateProfileBackground(url).subscribe()
                        } else if (elementToUpdate == 'avatar') {

                            this.heroBannerInformation.avatarImageUrl = url;
                            this.profileService.updateProfileAvatar(url).subscribe();
                        }
                    },
                    error: errorResponse => {
                        console.log(" Erro ao salvar a imagem de perfillll " + reader);
                    }
                })
            }
        }
    }

    private decompressImage(image: string | ArrayBuffer | null) {
        let imageFormat: string [];
        let formattedImage: IImage = {type: '', content: ''};

        if (typeof (image) == 'string') {
            imageFormat = (image.split(';'));

            imageFormat[0] = imageFormat[0].replace(/data:/g, '');
            imageFormat[1] = imageFormat[1].replace(/base64,/g, '');

            formattedImage = {type: imageFormat[0], content: imageFormat[1]};
        }

        return formattedImage;
    }
}
