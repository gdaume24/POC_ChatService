import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject('ws://localhost:8080/chat');
  }

  sendMessage(message: string) {
    this.socket$.next({ message });
  }

  getMessages() {
    return this.socket$.asObservable();
  }
}
