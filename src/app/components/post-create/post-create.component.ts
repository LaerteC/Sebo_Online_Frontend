import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import {environment} from "../../../environments/environment";
import {IImage} from "../../models/IImage";
import {ImageService} from "../../services/image.service";
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  isAvatarUploadShown: boolean = false;


  imageUrl: string;
  generosLivros: string[] = ["Ficção Científica", "Fantasia", "Romance", "Mistério", "Suspense", "Não Ficção", "História", "Aventura"];


  postForm = new FormGroup({
    nomeLivro: new FormControl('',Validators.required),
    generoLivro: new FormControl('',Validators.required),
    text: new FormControl('',[Validators.required,Validators.maxLength(350)]),
    imageUrl: new FormControl('')
  });

  get formValid() {
    return this.postForm.valid;
  }


  get formControls() {
    return this.postForm.controls;
  }


  posts: Post[] = [];

  profanity: boolean = false;
  createPost: boolean;


  @Input()
  isEditable: boolean = false;


  @Input()
  inputPosts: Post[] = [];

  @Input()
  fotoPost : Post;

  @Output()
  outputPosts: EventEmitter<Post[]> = new EventEmitter();

  constructor(private postService: PostService, private route: ActivatedRoute, private authService: AuthService,private imageService: ImageService, private profileService: ProfileService) { }



  ngOnInit(){

  }
  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }


  submitPost = async (e: any) => {
    e.preventDefault();

    try {
      // Chame a função onImageChange usando await para obter a URL da imagem
      console.log("Caraiii aqui aparece um objeto  " + e);


      // Agora você pode usar a variável imageUrl na função submitPost
      this.postService
        .upsertPost(
          new Post(
            0,
            this.postForm.value.text || "",
            this.imageUrl, // Use a URL da imagem obtida da função onImageChange
            0,
            this.authService.currentUser,
            [],
            this.postForm.value.nomeLivro || "",
            this.postForm.value.generoLivro || ""
          )
        )
        .subscribe({
          next: (response) => {
            // Adicione a resposta à lista de posts depois que ela for obtida
            this.posts = [response, ...this.posts];
            this.profanity = false;
            this.toggleCreatePost();
          },
          error: (error) => {
            if (error.error === "profanity") {
              this.profanity = true;
            }
          },
          complete: () => {
            this.postForm.controls.imageUrl.setValue('');
            this.postForm.controls.text.setValue('');
            this.profanity = false;
          },
        });
    } catch (error) {
      // Lidere com erros, se necessário
      console.error("Erro ao obter a URL da imagem:", error);
    }
  };



  async onImageChange(e: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      if (e.target.files && e.target.files.length) {
        const [image]: File[] = e.target.files;

        reader.readAsDataURL(image);

        reader.onload = () => {
          this.imageService.uploadImage(this.decompressImage(reader.result)).subscribe({
            next: (response: any) => {
              this.imageUrl = `${environment.baseUrl}/image/${response.id}`;
              console.log("URL da imagem: " + this.imageUrl);

              return resolve(this.imageUrl)
            },
            error: (error) => {
              // Em caso de erro, rejeite a Promise
              reject(error);
            },
          });
        };
      } else {
        // Caso não haja arquivo selecionado, rejeite a Promise
        reject("Nenhum arquivo selecionado");
      }
    });
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

  onPostRemove(e: any) {
    this.posts = this.posts.filter(post => post.id != e.id);
  }

  updateDescriptionCount(event: any) {
    const descriptionLength = event.target.value.length;
    // Atualiza o contador na descrição no seu modelo
  }

  toggleProfanity = () => {
    this.profanity = false;
  }
}
