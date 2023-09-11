import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageService } from 'src/app/services/image.service';
import { ProfileService } from 'src/app/services/profile.service';

import { PhotosPageComponent } from './photos-page.component';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavbar{}

describe('PhotosPageComponent', () => {
  let component: PhotosPageComponent;
  let fixture: ComponentFixture<PhotosPageComponent>;
  let imageServiceStub: Partial<ImageService>;
  let profileServiceStub: Partial<ProfileService>;

  imageServiceStub = {

  }

  profileServiceStub = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PhotosPageComponent, MockNavbar ],
      providers: [ 
        { provide: ImageService, useValue: imageServiceStub },
        { provide: ProfileService, useValue: profileServiceStub }
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
