import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-edit-profile-sidebar',
  template: ''
})
class MockEditProfileSidebar{}

@Component({
  selector: 'app-edit-profile-general-info',
  template: ''
})
class MockEditProfileGeneralInfo {}

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let dialogRefStub: Partial<MatDialogRef<EditProfileComponent>>;
  let data: Partial<InjectionToken<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule, MatDividerModule ],
      declarations: [ EditProfileComponent, MockEditProfileSidebar, MockEditProfileGeneralInfo ],
      providers: [
        MatDialog,
        {provide: MatDialogRef<EditProfileComponent>, useValue: dialogRefStub},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
