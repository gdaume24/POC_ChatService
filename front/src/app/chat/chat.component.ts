import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, AfterViewChecked {
  ws = new WebSocket('ws://localhost:8080/chat');
  status = '';
  clients = [1];
  clientMessage: string[] = [];
  messageQueue: string[] = [];
  users: string[] = [
    'Jasper',
    'Luke',
    'Kieran',
    'Terra',
    'Erin',
    'Belfry',
    'Luna',
    'Gaara',
    'Nimbus',
    'Akasha',
    'Leo',
    'Peter',
    'Jack',
    'Reid',
    'Ryan',
  ];
  activeUsers: string[] = [];
  @ViewChildren('messageContainer') messageContainer!: QueryList<ElementRef>;

  ngOnInit() {
    this.handleSocketEvents();
    this.randomizeNamesArray();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  randomizeNamesArray() {
    const newArr = [];
    for (let i = 0; i < this.users.length; i++) {
      const rando = Math.floor(Math.random() * this.users.length);
      newArr.push(this.users[rando]);
      this.users.splice(this.users.indexOf(this.users[rando]), 1);
    }
    this.users = newArr;
    this.activeUsers.push(this.users[0]);
  }

  scrollToBottom() {
    this.messageContainer.forEach((container) => {
      const el = container.nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  }

  handleSocketEvents() {
    this.ws.onopen = (c: any) => {
      console.log(c);
      this.status = 'Connection established: ' + c.target.url;
    };
    this.ws.onerror = (e: any) => {
      console.log(e);
      this.status = 'Error encountered';
    };
    this.ws.onclose = (c: any) => {
      console.log(c);
      this.status = 'Closed connection';
    };
    this.ws.onmessage = (message: any) => {
      console.log(message);
      this.status = `Message received`;
      this.broadcastMessage(message);
    };
  }

  addClient() {
    const user = this.users[this.activeUsers.length];
    if (user) this.activeUsers.push(user);
    else this.activeUsers.push(`Guest ${(this.activeUsers.length - this.users.length) + 1}`);
  }

  send(index: number) {
    const message = this.clientMessage[index];
    if (!message) return;
    this.ws.send(this.activeUsers[index]);
    this.ws.send(message);
    this.clientMessage[index] = '';
  }

  broadcastMessage(message: any) {
    this.messageQueue.push(message.data);
  }
}