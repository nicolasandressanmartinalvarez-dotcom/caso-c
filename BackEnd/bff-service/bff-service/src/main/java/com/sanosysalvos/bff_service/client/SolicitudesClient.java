package com.sanosysalvos.bff_service.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.sanosysalvos.bff_service.Model.Solicitud;

@FeignClient(name = "SOLICITUDES-SERVICE", contextId = "solicitudesClient")
public interface SolicitudesClient {

    @GetMapping("/api/solicitudes")
    List<Solicitud> obtenerTodas(@RequestHeader("Authorization") String authorization);

    @GetMapping("/api/solicitudes/{id}")
    Solicitud obtenerPorId(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id);

    @PostMapping(value = "/api/solicitudes", headers = "Content-Type=application/json")
    Solicitud crear(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Solicitud solicitud);

    @PutMapping(value = "/api/solicitudes/{id}", headers = "Content-Type=application/json")
    Solicitud actualizar(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id,
            @RequestBody Solicitud solicitud);

    @DeleteMapping("/api/solicitudes/{id}")
    void eliminar(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id);
}
