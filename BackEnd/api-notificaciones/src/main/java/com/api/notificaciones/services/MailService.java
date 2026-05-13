package com.api.notificaciones.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    JavaMailSender javaMailSender;

    public void MandarEmail(String remitente, String asunto,String Mensaje){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(remitente);
        message.setSubject(asunto);
        message.setText(Mensaje);
        message.setFrom("cuentasvminecraft2026fmjn@gmail.com");
        javaMailSender.send(message);
    }
}
