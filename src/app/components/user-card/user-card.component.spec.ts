import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { defer, Observable } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let authServiceStub: Partial<AuthService>;
  let user = new User(0,"","","");

  authServiceStub = {
    restoreSession(): Observable<User> {
      return defer(()=>Promise.resolve(user))
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDividerModule, MatCardModule ], 
      declarations: [ UserCardComponent ],
      providers: [{provide: AuthService, useValue: authServiceStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
