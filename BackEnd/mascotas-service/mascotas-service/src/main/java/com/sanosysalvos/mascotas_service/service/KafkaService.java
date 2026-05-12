package com.sanosysalvos.mascotas_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void mandarNotificacion(String topic, String mensaje){
        kafkaTemplate.send("mensaje-prueba", mensaje);
    }
}
