package com.sanosysalvos.bff_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.sanosysalvos.bff_service.client.NotificacionesClient;
import com.sanosysalvos.bff_service.Model.Registro;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/bff/notificaciones")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificacionesBffController {

    private final NotificacionesClient notificacionesClient;

    NotificacionesBffController(NotificacionesClient notificacionesClient) {
        this.notificacionesClient = notificacionesClient;
    }

    @PostMapping
    public Registro enviar(@RequestBody Registro registro) {
        return notificacionesClient.enviarNotificacion(registro);
    }
    
    @GetMapping
    public  List<Registro> todosLosRegistros() {
        return notificacionesClient.traerNotificaciones();
    }
    
}