import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './loginusuario.component.html',
  styleUrls: ['./loginusuario.component.css']
})
export class LoginusuarioComponent {

  backgroundImages: string[] = [
    'src/assets/images/c.jpg',
    'src/assets/images/c.jpg',
    'src/assets/images/.jpg',
    'src/assets/images/.jpg',
    'src/assets/images/.jpg',
    'src/assets/images/.jpg',
    // Adicione mais URLs de imagens aqui
  ];

  hasError = false;
  message = "";

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])

  });

  //  método para acessar os erros do formulário no seu template
  get formControls() {
    return this.loginForm.controls;
  }

  getRandomBackgroundImage(): string {
    const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
    return this.backgroundImages[randomIndex];
  }
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(e: any): void {
    e.preventDefault()
    this.authService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe({

        next: (response) => {
          this.authService.currentUser = response
          this.router.navigate(['post-feed'])
        },

        error: response => {
          this.hasError = true;
          this.message = response.error;
        }
    })
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
