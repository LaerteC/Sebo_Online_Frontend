import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourOFourPageComponent } from './four-o-four-page.component';

@Component({
  selector: 'app-navbar',
  template: ''
})
class MockNavbar{

}

describe('FourOFourPageComponent', () => {
  let component: FourOFourPageComponent;
  let fixture: ComponentFixture<FourOFourPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourOFourPageComponent, MockNavbar ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourOFourPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
