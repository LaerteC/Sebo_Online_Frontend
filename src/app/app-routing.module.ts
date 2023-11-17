import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginusuarioComponent } from './components/loginusuario/loginusuario.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/registerUser/register.component';
import { FollowingsPageComponent } from './pages/followings-page/followings-page.component';
import { ErrorComponent } from './pages/error-page/error.component';
import { PhotosPageComponent } from './pages/photos-page/photos-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginusuarioComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  { path: "followings", component: FollowingsPageComponent },
  { path: "photos", component: PhotosPageComponent },
  { path: "profile", component: ProfilePageComponent },
  { path: "search", component: SearchPageComponent },
  { path: "error", component: ErrorComponent },
  { path:"forgot",component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
