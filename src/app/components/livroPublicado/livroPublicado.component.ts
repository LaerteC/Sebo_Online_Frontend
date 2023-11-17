import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import User from '../../models/User';

@Component({
  selector: 'app-livroPublicado',
  templateUrl: './livroPublicado.component.html',
  styleUrls: ['./livroPublicado.component.css']
})
export class LivroPublicadoComponent implements OnInit {

  //Diretiva para acompnhar a aba para exibir comentários
  showComments = false;
  postVisible: boolean = true; // Define se o post está visível inicialmente


  commentForm = new FormGroup({
    text: new FormControl('')
  })

  @Input('post') post: Post
  replyToPost: boolean = false
  currentUser: User = this.authService.currentUser

  @Output() postToRemove: EventEmitter<Post> = new EventEmitter();

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {

    const savedPostVisibility = localStorage.getItem('postVisibility');
    if (savedPostVisibility !== null) {
      this.postVisible = JSON.parse(savedPostVisibility);
    } else {
      // Se não houver um estado salvo, define um valor padrão (por exemplo, true ou false)
      this.postVisible = false; // ou true, dependendo do seu caso
    }

  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  togglePostVisibility(authorId: number) {
      this.postVisible = !this.postVisible;
      localStorage.setItem('postVisibility', JSON.stringify(this.postVisible));
      this.updatePostVisibilityOnBackend(this.post.id, this.postVisible);
  }


  updatePostVisibilityOnBackend(postId: number, isVisible: boolean) {
    this.postService.updatePostVisibilityOnBackend(postId, isVisible)
      .subscribe(
        (response) => {
          // Lógica para lidar com a resposta do backend, se necessário
        },
        (error) => {
          // Lógica para lidar com erros, se necessário
        }
      );
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", 0, this.authService.currentUser, [])
    this.postService.upsertPost({...this.post, comentario: [...this.post.comentario, newComment]})
      .subscribe(
        (response) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }


  changeBook(id: number, id_Dono: number): void {
    console.log(id + ' ' + id_Dono + ' Aqui está chegando o valor !!!');
    // Chamando o método exchangeBook para fazer a solicitação HTTP POST
    this.postService.exchangeBook(id, id_Dono).subscribe(
      (response) => {
        // Lida com a resposta da solicitação POST
        console.log('Troca de livro realizada com sucesso:', response);
        // Adicione aqui qualquer lógica adicional após a troca de livro, se necessário
      },
      (error) => {
        // Lida com erros na solicitação POST
        console.error('Erro ao realizar a troca de livro:', error);
        // Adicione aqui qualquer lógica de tratamento de erro, se necessário
      }
    );
  }


}
