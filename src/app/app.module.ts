import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginusuarioComponent } from './components/loginusuario/loginusuario.component';
import { RegisterComponent } from './components/registerUser/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules_Generals/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { LivroPublicadoComponent } from './components/livroPublicado/livroPublicado.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfilePersonalInformationComponent } from './components/profileUser/profile-personal-information/profile-personal-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './components/profileUser/edit-profile/edit-profile.component';
import { EditProfileSidebarComponent } from './components/profileUser/edit-profile-sidebar/edit-profile-sidebar.component';
import { EditProfileSecuritySettingsComponent } from './components/profileUser/edit-profile-security-settings/edit-profile-security-settings.component';
import { ProfileBannerComponent } from './components/profileUser/profile-banner/profile-banner.component';
import { ErrorComponent } from './pages/error-page/error.component';
import { EditProfileGeneralInfoComponent } from './components/profileUser/edit-profile-general-info/edit-profile-general-info.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { VoteButtonComponent } from './components/shared/vote-button/vote-button.component';
import { EditProfileLocationComponent } from './components/profileUser/edit-profile-location/edit-profile-location.component';
import { EditProfileEducationComponent } from './components/profileUser/edit-profile-education/edit-profile-education.component';
import { EditProfileMaritalStatusComponent } from './components/profileUser/edit-profile-marital-status/edit-profile-marital-status.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDeleteButtonComponent } from './components/shared/post-delete-button/post-delete-button.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchUserCardComponent } from './components/search-user-card/search-user-card.component';
import { ProfileFollowingComponent } from './components/profileUser/profile-following/profile-following.component';
import { FollowingsPageComponent } from './pages/followings-page/followings-page.component';
import { PhotosPageComponent } from './pages/photos-page/photos-page.component';
import { PhotosPageImagesComponent } from './components/photosBook/photos-page-images/photos-page-images.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {MatChipsModule} from '@angular/material/chips';
import { GerenciarlivroComponent } from './components/gerenciarlivro/gerenciarlivro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginusuarioComponent,
    RegisterComponent,
    PostFeedPageComponent,
    LivroPublicadoComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    UserInitialsPipe,
    ProfilePageComponent,
    ProfilePersonalInformationComponent,
    EditProfileComponent,
    EditProfileSidebarComponent,
    EditProfileSecuritySettingsComponent,
    ProfileBannerComponent,
    ErrorComponent,
    EditProfileGeneralInfoComponent,
    OnlyNumbersDirective,
    VoteButtonComponent,
    EditProfileLocationComponent,
    EditProfileEducationComponent,
    EditProfileMaritalStatusComponent,
    PostCreateComponent,
    PostDeleteButtonComponent,
    SearchPageComponent,
    SearchUserCardComponent,
    ProfileFollowingComponent,
    FollowingsPageComponent,
    PhotosPageComponent,
    PhotosPageImagesComponent,
    ForgotPasswordComponent,
    GerenciarlivroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
