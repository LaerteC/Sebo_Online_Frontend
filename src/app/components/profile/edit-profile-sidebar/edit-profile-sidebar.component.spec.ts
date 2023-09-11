import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';

import { EditProfileSidebarComponent } from './edit-profile-sidebar.component';

describe('EditProfileSidebarComponent', () => {
  let component: EditProfileSidebarComponent;
  let fixture: ComponentFixture<EditProfileSidebarComponent>;
  let authServiceStub: Partial<AuthService>;
  let dialogStub: Partial<MatDialog>;
  let dialogRefStub: Partial<MatDialogRef<EditProfileSidebarComponent>>;

  authServiceStub = {

  }

  dialogStub = {

  }

  dialogRefStub = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatIconModule],
      declarations: [ EditProfileSidebarComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
        {provide: MatDialog, useValue: dialogStub},
        {provide: MatDialogRef, useValue: dialogRefStub},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
