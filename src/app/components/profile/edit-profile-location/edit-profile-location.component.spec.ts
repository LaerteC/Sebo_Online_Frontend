import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { defer, Observable } from 'rxjs';
import { IProfileLocation } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

import { EditProfileLocationComponent } from './edit-profile-location.component';

describe('EditProfileLocationComponent', () => {
  let component: EditProfileLocationComponent;
  let fixture: ComponentFixture<EditProfileLocationComponent>;
  let profileServiceStub: Partial<ProfileService>;

  profileServiceStub = {
    getProfileLocation(): Observable<IProfileLocation> {
      let location: IProfileLocation = {
        currentCity: '',
        currentCountry: '',
        bornCity: '',
        bornCountry: ''
      }
      
    
      return defer( () => Promise.resolve(location));
    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MatFormFieldModule, MatDividerModule,
        MatInputModule, BrowserAnimationsModule],
      declarations: [ EditProfileLocationComponent ],
      providers: [
        {provide: ProfileService, useValue: profileServiceStub}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
