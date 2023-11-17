import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IRequestProfiles from 'src/app/models/IRequest';
import { IProfile, Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  profiles: Profile[] = [];
  wordCount: number = 0; // Contador de palavras no campo de entrada
  subscribedIds: number[] = []; // IDs dos perfis assinados
  ownId: number; // ID do perfil do usuário logado


  nomeNaoEncontrado: boolean;
  constructor(private searchService: SearchService, private profileService: ProfileService) { }

  // Defina o formulário com validações
  form = new FormGroup({
    userName: new FormControl('', [
      Validators.required, // Campo obrigatório
      Validators.minLength(3), // Mínimo de 3 caracteres
      Validators.maxLength(50), // Máximo de 50 caracteres
    ])
  });

  ngOnInit(): void {
    // Carrega o perfil do usuário logado
    this.profileService.getOwnProfile().subscribe({
      next: (ownProfile: Profile) => {
        this.subscribedIds = ownProfile.subscriptionIds;
        this.ownId = ownProfile.id;
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      }
    });

    // Carrega perfis iniciais (por exemplo, os 20 primeiros)
    this.searchService.getProfiles(20).subscribe({
      next: (profiles: IProfile[]) => {
        this.profiles = profiles;
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      }
    });
  }

  onChange() {
    this.form.controls.userName.setErrors({ notValid: false });
  }


  // Método para enviar a pesquisa
  onSubmit() {
    // Obtém o valor do campo de entrada
    const value = this.form.controls.userName.value ?? '';

    // Verifica se o campo userName atende aos critérios de validação
    if (this.form.valid) {
      // Divide o valor do campo em nome e sobrenome
      let [firstName, lastName] = value.split(' ');

      // Verifica se não foi especificado um sobrenome e define-o como vazio
      if (lastName == undefined) lastName = '';

      // Cria um objeto de parâmetros de pesquisa com o nome e sobrenome
      let requestParams: IRequestProfiles = { firstName, lastName };

      // Realiza a pesquisa específica no serviço searchService
      this.searchService.getSpecificProfiles(requestParams).subscribe(
        (response: IProfile[]) => {
          // Atualiza a lista de perfis com os resultados da pesquisa
          this.profiles = response;

          // Verifica se nenhum perfil foi encontrado
          if (response.length === 0) {
            // Define a propriedade nomeNaoEncontrado como verdadeira para exibir uma mensagem
            this.nomeNaoEncontrado = true;
          } else {
            // Caso contrário, redefina a propriedade nomeNaoEncontrado como falsa
            this.nomeNaoEncontrado = false;
          }
        },
        (errorResponse) => {
          // Trata erros de resposta do serviço, se houver algum
          // Neste caso, você pode adicionar uma mensagem de erro personalizada
          console.error(errorResponse);

          // Define a propriedade nomeNaoEncontrado como verdadeira para exibir uma mensagem
          this.nomeNaoEncontrado = true;
        }
      );
    }
  }

}
