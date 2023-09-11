import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  profanity: boolean = false;
  createPost: boolean;

  @Input()
  inputPosts: Post[] = [];

  @Output()
  outputPosts: EventEmitter<Post[]> = new EventEmitter();
  

  constructor(private postService: PostService, private authService: AuthService) { }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  submitPost = (e: any) => {
    e.preventDefault();
    this.postService.upsertPost(new Post(0, this.postForm.value.text || "", this.postForm.value.imageUrl || "", 0, this.authService.currentUser, []))
      .subscribe({
        next: (response) => {
          this.inputPosts = [response, ...this.inputPosts]
          this.outputPosts.emit(this.inputPosts);
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
    this.profanity = false;
  }
}
