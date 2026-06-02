package com.sanosysalvos.bff_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.sanosysalvos.bff_service.Model.Registro;

@FeignClient(name = "notificaciones")
public interface NotificacionesClient {

    @PostMapping("/api/registro/v1")
    Registro enviarNotificacion(@RequestBody Registro registro);
}