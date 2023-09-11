import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';
import { over } from 'stompjs';
import { Component } from '@angular/core';


import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-navbar',
  template: '',
})
class MockNavbarComponent {}

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let httpSpy2: jasmine.SpyObj<HttpClient>;
  let user = new User(1,"email","first_name","last_name");
  let authSpy: jasmine.SpyObj<AuthService>;
  let socketServiceSpy: jasmine.SpyObj<SocketService>;
  let socketSpy: jasmine.SpyObj<Stomp.Client>;

  beforeEach(async () => {
    httpSpy = jasmine.createSpyObj('HttpClient',['get','post']);
    authSpy = jasmine.createSpyObj('AuthService',['restoreSession']);
    authSpy.restoreSession.and.returnValue(of(user));
    httpSpy.get.and.returnValue(of(user));
    httpSpy2 = jasmine.createSpyObj('HttpClient',['get']);
    httpSpy2.get.and.returnValue(of(["public", "room1", "room2"]));
    socketServiceSpy = jasmine.createSpyObj('SocketService',['getSocket']);
    socketServiceSpy.getSocket.and.returnValue(Stomp.over(new WebSocket('ws://test.address')));
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent, MockNavbarComponent ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: HttpClient, useValue: httpSpy},
        {provide: HttpClient, useValue: httpSpy2},
        {provide: SocketService, useValue: socketServiceSpy}
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle room input', () => {
    component.handleRoom({target: {value: "room"}});
    expect(component.roomName).toEqual("room");
  });

  it('should handle message input', () => {
    component.handleMessage({target: {value: "message"}});
    expect(component.userData.message).toEqual("message");
  })

  it('should changed current viewing room', () => {
    component.tab="room";
    component.chats.room2 = [];
    component.changeTab({target:{textContent:"room2 "}});
    expect(component.tab).toEqual("room2");
  })

  it('should not change current viewing room if not subscribed', () => {
    component.tab = "room";
    component.chats = {};
    component.changeTab({target:{textContent:"room2"}});
    expect(component.tab).toEqual("room");
  })

  it('should reload list of rooms', () => {
    component.reloadRooms();
    expect(component.rooms).toEqual(["public", "room1", "room2"]);
  })
  
});
