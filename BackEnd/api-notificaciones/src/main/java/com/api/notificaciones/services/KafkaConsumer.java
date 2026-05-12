package com.api.notificaciones.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.api.notificaciones.model.MensajePrueba;
import com.api.notificaciones.repository.MensajeRepo;

@Service
public class KafkaConsumer {

    @Autowired
    private MensajeRepo mensajeRepo;

    @KafkaListener(
        topics = "mensaje-prueba",
        groupId = "notificaciones-group"
    )
    public void kafkaConsume(String mensaje){

        System.out.println("Mensaje recibido: " + mensaje);

        MensajePrueba mp = new MensajePrueba();

        mp.setMensaje(mensaje);

        mensajeRepo.save(mp);
    }
}
