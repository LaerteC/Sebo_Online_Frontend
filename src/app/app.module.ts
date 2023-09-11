import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfilePersonalInformationComponent } from './components/profile/profile-personal-information/profile-personal-information.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { EditProfileSidebarComponent } from './components/profile/edit-profile-sidebar/edit-profile-sidebar.component';
import { EditProfileSecuritySettingsComponent } from './components/profile/edit-profile-security-settings/edit-profile-security-settings.component';
import { ProfileHeroBannerComponent } from './components/profile/profile-hero-banner/profile-hero-banner.component';
import { FourOFourPageComponent } from './pages/four-o-four-page/four-o-four-page.component';
import { EditProfileGeneralInfoComponent } from './components/profile/edit-profile-general-info/edit-profile-general-info.component';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { VoteButtonComponent } from './components/shared/vote-button/vote-button.component';
import { EditProfileLocationComponent } from './components/profile/edit-profile-location/edit-profile-location.component';
import { EditProfileEducationComponent } from './components/profile/edit-profile-education/edit-profile-education.component';
import { EditProfileWorkComponent } from './components/profile/edit-profile-work/edit-profile-work.component';
import { EditProfileMaritalStatusComponent } from './components/profile/edit-profile-marital-status/edit-profile-marital-status.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDeleteButtonComponent } from './components/shared/post-delete-button/post-delete-button.component';
import { ChatComponent } from './components/chat/chat.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchUserCardComponent } from './components/search-user-card/search-user-card.component';
import { SearchUserSidebarComponent } from './components/search-user-sidebar/search-user-sidebar.component';
import { ProfileFollowingComponent } from './components/profile/profile-following/profile-following.component';
import { FollowingsPageComponent } from './pages/followings-page/followings-page.component';
import { PhotosPageComponent } from './pages/photos-page/photos-page.component';
import { PhotosPageImagesComponent } from './components/photos/photos-page-images/photos-page-images.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostFeedPageComponent,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    UserInitialsPipe,
    ProfilePageComponent,
    ProfilePersonalInformationComponent,
    EditProfileComponent,
    EditProfileSidebarComponent,
    EditProfileSecuritySettingsComponent,
    ProfileHeroBannerComponent,
    FourOFourPageComponent,
    EditProfileGeneralInfoComponent,
    OnlyNumbersDirective,
    VoteButtonComponent,
    ChatComponent,
    EditProfileLocationComponent,
    EditProfileEducationComponent,
    EditProfileWorkComponent,
    EditProfileMaritalStatusComponent,
    PostCreateComponent,
    PostDeleteButtonComponent,
    SearchPageComponent,
    SearchUserCardComponent,
    SearchUserSidebarComponent,
    ProfileFollowingComponent,
    FollowingsPageComponent,
    PhotosPageComponent,
    PhotosPageImagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
