import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import {environment} from "../../../environments/environment";
import {IImage} from "../../models/IImage";
import {ImageService} from "../../services/image.service";
import {ProfileService} from "../../services/profile.service";
import {IProfile} from "../../models/Profile";
import {IProfileHeroBanner} from "../../models/ProfileHeroBanner";

@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css']
})

export class PostFeedPageComponent implements OnInit {

  isAvatarUploadShown: boolean = false;
  @Input()
  updateProfile (profile: IProfile): void {};

  @Input()
  isEditable: boolean = false;

  @Input()
  heroBannerInformation: IProfileHeroBanner;

  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  posts: Post[] = [];
  createPost:boolean = false;
  profanity: boolean = false;

  constructor(private postService: PostService, private authService: AuthService,private imageService: ImageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.postService.getAllSubscribedPosts().subscribe(
      (response) => {
        this.posts = response
      }
    )
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  submitPost = (e: any) => {
    e.preventDefault();
    this.postService.upsertPost(new Post(0, this.postForm.value.text || "", this.postForm.value.imageUrl || "", 0, this.authService.currentUser, []))
      .subscribe({
        next: (response) => {
          this.posts = [response, ...this.posts]
          this.profanity = false;
          this.toggleCreatePost()
        }, 
        error: error => {
          if (error.error === "profanity") {
            this.profanity = true;
          }
        },
        complete: () => {
          this.postForm.controls.imageUrl.setValue('')
          this.postForm.controls.text.setValue('')
          this.profanity = false;
        }
    })
  }

  toggleProfanity = () => {
    console.log("profanity");
    this.profanity = false;
  }

  onPostRemove(e: any) {
    this.posts = this.posts.filter(post => post.id != e.id);
  }



  onImageChange(e: any, elementToUpdate: string) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [image]: File[] = e.target.files;

      reader.readAsDataURL(image);

      reader.onload = () => {
        this.imageService.uploadImage(this.decompressImage(reader.result)).subscribe({
          next: (response : any) => {
            let url = `${environment.baseUrl}/image/${response.id}`;

            if (elementToUpdate == 'livro') {
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
    let formattedImage: IImage = { type: '', content: ''};

    if (typeof(image) == 'string') {
      imageFormat  = (image.split(';'));

      imageFormat[0] = imageFormat[0].replace(/data:/g, '');
      imageFormat[1] = imageFormat[1].replace(/base64,/g, '');

      formattedImage = { type: imageFormat[0], content: imageFormat[1]};
    }

    return formattedImage;
  }
}

