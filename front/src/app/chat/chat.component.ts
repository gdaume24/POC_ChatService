import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
public messages: string[] = [];
public typedMessage: string = '';

  constructor(private chatService: ChatService) {}

ngOnInit(): void {
// Abonnements aux messages


}
}
