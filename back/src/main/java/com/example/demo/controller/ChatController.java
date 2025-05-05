 package com.example.demo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.example.demo.payload.request.ChatMessage;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")  // Lorsqu'un client envoie un message via "/app/sendMessage"
    @SendTo("/topic/public")  // Le message sera diffusé à tous les clients abonnés à "/topic/messages"
    public ChatMessage sendMessage(
           @Payload ChatMessage chatMessage
        ) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")  // Lorsqu'un client envoie un message via "/app/sendMessage"
    @SendTo("/topic/public")  // Le message sera diffusé à tous les clients abonnés à "/topic/messages"
    public ChatMessage addUser(
        @Payload ChatMessage chatMessage,
        SimpMessageHeaderAccessor headerAccessor 
    ) {
        // Ajoute le nom d'utilisateur dans l'en-tête de la session WebSocket
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}