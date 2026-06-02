package com.sanosysalvos.bff_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sanosysalvos.bff_service.client.NotificacionesClient;
import com.sanosysalvos.bff_service.Model.Registro;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/bff/notificaciones")
@CrossOrigin(origins = "http://localhost:5173")



public class NotificacionesBffController {

    @Autowired
    private NotificacionesClient notificacionesClient;

    @PostMapping
    public Registro enviar(@RequestBody Registro registro) {
        return notificacionesClient.enviarNotificacion(registro);
    }
    
    @GetMapping
    public  List<Registro> todosLosRegistros() {
        return notificacionesClient.traerNotificaciones();
    }
    
}