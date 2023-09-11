import { Target } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { EditProfileComponent } from 'src/app/components/profile/edit-profile/edit-profile.component';
import Post from 'src/app/models/Post';
import { IProfile } from 'src/app/models/Profile';
import { IProfileHeroBanner, ProfileHeroBanner } from 'src/app/models/ProfileHeroBanner';
import { ProfilePersonalInfo } from 'src/app/models/ProfilePersonalInfo';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnDestroy {

  routerEventSubscription: Subscription;
  activatedRouteSubscription: Subscription;
  alienProfileSubscription: Subscription;
  ownProfileSubscription: Subscription;

  isEditable = true;

  inputPosts!: Post[];
  posts!: Post[];
  updatePosts(posts: Post[]) { this.posts = posts;}

  user!: User;

  profileHeroBanner: ProfileHeroBanner = new ProfileHeroBanner();
  profilePersonalInfo: ProfilePersonalInfo = new ProfilePersonalInfo();
  followersIds: number[] = [];
  profileId: number;

  isProfileToDisplay: boolean;

  photoUrls: string[] = [];
  

  constructor(private authService: AuthService, private postService: PostService, public router: Router, private profileService: ProfileService,
              private activatedRoute: ActivatedRoute, public dialog: MatDialog ) 
  {
    /* Bind context for the method update profile */
    this.updateProfile = this.updateProfile.bind(this);

    /* A hook detects event of changing route inside of a profile */
    this.routerEventSubscription = router.events
      .pipe( filter(event => event instanceof NavigationEnd))
      .subscribe((val) => {

      this.isEditable = true;

      /* Defined query parameters if provided and makes appropriate request to Profile API */
      this.activatedRouteSubscription = this.activatedRoute.queryParams
      .pipe( filter( params =>  params['id']) )
      .subscribe( params => {
        this.isEditable = false;

        this.alienProfileSubscription = this.profileService.getProfile(params['id']).subscribe({
          next: (profile : IProfile) => {
            this.manageProfileHeroBanner(profile);
            this.manageProfilePersonalInfo(profile);
            

            this.followersIds = profile.subscriptionIds ?? [];
            
            this.profileId = profile.owner.id;

            const photos =  profile.photoUrls ?? [];
            this.photoUrls = (photos.length > 6) ? photos.slice(0, 6) : photos;

            this.postService.userPosts(profile.owner.id).subscribe( posts => { 
              this.posts = posts.reverse() 
            })
          },
          error: () => { this.router.navigate(['/404']); }
        }) 
      });

      /* Allows edit profile accessed on /profile route */
      if (this.isEditable) {
        this.ownProfileSubscription = this.profileService.getOwnProfile().subscribe( (profile: IProfile) => {
          this.isEditable = true;
          this.manageProfileHeroBanner(profile);
          this.manageProfilePersonalInfo(profile);

          this.followersIds = profile.subscriptionIds ?? [];

          const photos =  profile.photoUrls ?? [];
          this.photoUrls = (photos.length > 6) ? photos.slice(0, 6) : photos;
        })

        /* Restored session and takes userPosts */
        this.authService.restoreSession().subscribe( user => {
          this.user = user;
    
          this.postService.userPosts(this.user.id).subscribe( posts => { 
            this.posts = posts
            this.inputPosts = posts.reverse();
          })
        })
      }
    });
  }

  /* Filled everything needed for ProfileHeroBanner component */
  private manageProfileHeroBanner(profile: IProfile) {
    this.profileHeroBanner = new ProfileHeroBanner({...profile, ...profile.owner})
  }

  private manageProfilePersonalInfo(profile: IProfile) {
      this.profilePersonalInfo = new ProfilePersonalInfo({...profile});
      this.isProfileToDisplay = ProfilePersonalInfo.hasSomethingToDisplay({...profile})
  }

  updateProfile (profile : IProfile) {
    this.manageProfileHeroBanner(profile);
    this.manageProfilePersonalInfo(profile)
  }

  onPostRemove(e: any) {
    console.log(e)
    this.posts = this.posts.filter(post => post.id != e.id);
  }

  openDialog() {
    this.dialog.open(EditProfileComponent, {
      data: { componentToDisplay: "general information", updateProfile: this.updateProfile }
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
    this.activatedRouteSubscription.unsubscribe();
  };
}
