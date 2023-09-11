import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import User from 'src/app/models/User';
import { SubscriptionService } from 'src/app/services/subscription.service';

import { SearchUserCardComponent } from './search-user-card.component';

describe('SearchUserCardComponent', () => {
  let component: SearchUserCardComponent;
  let fixture: ComponentFixture<SearchUserCardComponent>;
  let subscriptionServiceSpy: jasmine.SpyObj<SubscriptionService>
  subscriptionServiceSpy = jasmine.createSpyObj('SubscriptionSevice', ['subscribeProfile', 'unsubscribeProfile']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatIconModule, MatExpansionModule, 
        MatDividerModule, MatFormFieldModule, RouterTestingModule ], 
      declarations: [ SearchUserCardComponent ],
      providers: [ { provide: SubscriptionService, useValue: subscriptionServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUserCardComponent);
    component = fixture.componentInstance;
    component.subscribedIds = [];
    component.profile.owner = new User(0,"","","","");
    component.profile.id = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
