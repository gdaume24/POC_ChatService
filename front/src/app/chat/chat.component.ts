import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RxStompService } from '../rx-stomp.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  public messages: string[] = [];
  public typedMessage: string = '';

  constructor(
    private rxStompService: RxStompService) {}

  ngOnInit(): void {
  // Abonnements aux messages
    this.rxStompService.watch('/topic/messages').subscribe((msg: any) => {
      if(msg.message) {
        this.messages.push(msg.message);
      }
    })
  }

  send(): void {
    if (this.typedMessage.trim()) {
      this.rxStompService.publish({ destination: '/app/chat', body: this.typedMessage });
      this.typedMessage = '';
    }
  }

}
