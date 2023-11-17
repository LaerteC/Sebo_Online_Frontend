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
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ThemePalette} from "@angular/material/core";



export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css']
})

export class PostFeedPageComponent implements OnInit {


  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  //
  // availableColors: ChipColor[] = [
  //   {name: 'none', color: undefined},
  //   {name: 'Primary', color: 'primary'},
  //   {name: 'Accent', color: 'accent'},
  //   {name: 'Warn', color: 'warn'},
  // ];

  imageUrl: string;
  generosLivros: string[] = ["Ficção Científica", "Fantasia", "Romance", "Mistério", "Suspense", "Não Ficção", "História", "Aventura"];



  posts: Post[] = [];
  createPost:boolean = false;
  profanity: boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute, private authService: AuthService,private imageService: ImageService, private profileService: ProfileService) { }

  ngOnInit(): void {

    window.scrollTo(0, 0);

    this.postService.getAllSubscribedPosts().subscribe(
      (response) => {
        this.posts = response
      }
    )
  }


  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onChipSelectionChange(event: any) {
    if (event != null) {
      this.postService.getPostByCategory(event).subscribe(
        (response) => {
          this.posts = response;
          console.log('Chip selecionado Emanuel torce pro Coritiba:', event, 'VALOR DOS LIVROS:', this.posts);
        }
      );
    } else {
      console.log('Chip desselecionado:', event);
    }
  }



  onPostRemove(e: any) {
    this.posts = this.posts.filter(post => post.id != e.id);
  }


}

