package com.sanosysalvos.bff_service.controller;

import com.sanosysalvos.bff_service.client.CampanaClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bff")
@CrossOrigin("*")
public class CampanaBffController {

    private final CampanaClient campanaClient;

    public CampanaBffController(CampanaClient campanaClient) {
        this.campanaClient = campanaClient;
    }

    // GET: Listar todas las campañas
    @GetMapping("/campanas")
    public String obtenerCampanas(
            @RequestHeader("Authorization") String authorization) {
        return campanaClient.obtenerCampanas(authorization);
    }

    // GET: Listar campañas por municipalidad
    @GetMapping("/campanas/municipalidad/{municipalidadId}")
    public String obtenerCampanasPorMunicipalidad(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long municipalidadId) {
        return campanaClient.obtenerCampanasPorMunicipalidad(authorization, municipalidadId);
    }

    // POST: Crear campaña
    @PostMapping("/campanas")
    public String crearCampana(
            @RequestHeader("Authorization") String authorization,
            @RequestBody String body) {
        return campanaClient.crearCampana(authorization, body);
    }

    // DELETE: Eliminar campaña
    @DeleteMapping("/campanas/{id}")
    public ResponseEntity<Void> eliminarCampana(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        campanaClient.eliminarCampana(authorization, id);
        return ResponseEntity.noContent().build();
    }
}
