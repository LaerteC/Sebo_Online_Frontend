import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  getSocket = () => {
    const socket = new SockJS(environment.baseUrl + '/ws');
    return Stomp.over(socket);
  }

}

