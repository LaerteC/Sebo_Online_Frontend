import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ProfilePersonalInformationComponent } from './profile-personal-information.component';

describe('ProfilePersonalInformationComponent', () => {
  let component: ProfilePersonalInformationComponent;
  let fixture: ComponentFixture<ProfilePersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatIconModule ],
      declarations: [ ProfilePersonalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
