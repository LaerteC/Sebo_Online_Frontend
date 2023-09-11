import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchUserSidebarComponent } from './search-user-sidebar.component';

describe('SearchUserSidebarComponent', () => {
  let component: SearchUserSidebarComponent;
  let fixture: ComponentFixture<SearchUserSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatIconModule, MatExpansionModule, BrowserAnimationsModule],
      declarations: [ SearchUserSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
