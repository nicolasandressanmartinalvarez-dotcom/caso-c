package com.sanosysalvos.bff_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanosysalvos.bff_service.Model.Solicitud;
import com.sanosysalvos.bff_service.client.SolicitudesClient;

@RestController
@RequestMapping("/api/bff/solicitudes")
@CrossOrigin(origins = "http://localhost:5173")
public class SolicitudesBffController {

    private final SolicitudesClient solicitudesClient;

    public SolicitudesBffController(SolicitudesClient solicitudesClient) {
        this.solicitudesClient = solicitudesClient;
    }

    @GetMapping
    public List<Solicitud> obtenerTodas(@RequestHeader("Authorization") String authorization) {
        return solicitudesClient.obtenerTodas(authorization);
    }

    @GetMapping("/{id}")
    public Solicitud obtenerPorId(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        return solicitudesClient.obtenerPorId(authorization, id);
    }

    @PostMapping
    public Solicitud crear(
            @RequestHeader("Authorization") String authorization,
            @RequestBody Solicitud solicitud) {
        return solicitudesClient.crear(authorization, solicitud);
    }

    @PutMapping("/{id}")
    public Solicitud actualizar(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id,
            @RequestBody Solicitud solicitud) {
        return solicitudesClient.actualizar(authorization, id, solicitud);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        solicitudesClient.eliminar(authorization, id);
        return ResponseEntity.noContent().build();
    }
}
