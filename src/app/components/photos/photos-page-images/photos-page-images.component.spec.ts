import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileService } from 'src/app/services/profile.service';

import { PhotosPageImagesComponent } from './photos-page-images.component';

describe('PhotosPageImagesComponent', () => {
  let component: PhotosPageImagesComponent;
  let fixture: ComponentFixture<PhotosPageImagesComponent>;
  let profileServiceStub: Partial<ProfileService>;

  profileServiceStub = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosPageImagesComponent ],
      providers: [ { provide: ProfileService, useValue: profileServiceStub } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosPageImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
