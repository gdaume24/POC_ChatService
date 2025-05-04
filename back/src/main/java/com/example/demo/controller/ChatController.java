package com.example.demo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")  // Lorsqu'un client envoie un message via "/app/sendMessage"
    @SendTo("/topic/messages")  // Le message sera diffusé à tous les clients abonnés à "/topic/messages"
    public String sendMessage(String message) throws Exception {
        // Simule un délai pour les tests (facultatif)
        Thread.sleep(1000);
        return message;
    }
}