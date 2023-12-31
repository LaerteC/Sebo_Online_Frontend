import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { IProfileHeroBanner } from 'src/app/models/ProfileHeroBanner';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';


import { ProfileBannerComponent } from './profile-banner.component';

describe('ProfileHeroBannerComponent', () => {
  let component: ProfileBannerComponent;
  let fixture: ComponentFixture<ProfileBannerComponent>;
  let authServiceStub: Partial<ProfileService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let imageStub: Partial<ImageService>;
  let expectedHBI: IProfileHeroBanner =  {
    avatarImageUrl: "",
    backgroundImageUrl: "",
    firstName: "",
    lastName: "",
    currentCity: "",
    currentCountry: ""
  };

  dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

  imageStub = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBannerComponent ],
      providers: [
        {provide: MatDialog, useValue: dialogSpy}, 
        {provide: ImageService, useValue: imageStub},
        {provide: ProfileService, useValue: authServiceStub}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBannerComponent);
    component = fixture.componentInstance;
    component.heroBannerInformation = expectedHBI;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    component.openDialog();
    expect(dialogSpy.open).toHaveBeenCalled();
  });


});
