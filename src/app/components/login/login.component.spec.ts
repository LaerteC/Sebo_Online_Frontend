import { Directive } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Observable, defer, throwError, of } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

@Directive({
  selector: '[routerLink]'
})
class MockRouterLink{}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub: Partial<AuthService>;
  let router: Router;

  authServiceStub = {
    login(email: string, password: string): Observable<any> {
      let user = new User(0,"","","");
      return of(user);
    } 
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule, MatFormFieldModule, MatInputModule, 
        BrowserAnimationsModule, RouterTestingModule.withRoutes([]), ReactiveFormsModule ],
      declarations: [ LoginComponent, MockRouterLink ],
      providers: [
        {provide: AuthService, useValue: authServiceStub},
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to post-feed on login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    let mock = {preventDefault(){}};
    component.onSubmit(mock);
    expect(navigateSpy).toHaveBeenCalledWith(['post-feed']);
  }); 

  it('should navigate to register on calling register', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.register();
    expect(navigateSpy).toHaveBeenCalledWith(['register']);
  }); 
});
