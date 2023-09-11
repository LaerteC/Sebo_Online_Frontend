import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { FollowingsPageComponent } from './pages/followings-page/followings-page.component';
import { FourOFourPageComponent } from './pages/four-o-four-page/four-o-four-page.component';
import { PhotosPageComponent } from './pages/photos-page/photos-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  { path: "followings", component: FollowingsPageComponent },
  { path: "photos", component: PhotosPageComponent },
  { path: "profile", component: ProfilePageComponent },
  { path: "chat", component: ChatComponent },
  { path: "search", component: SearchPageComponent },
  { path: "404", component: FourOFourPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
