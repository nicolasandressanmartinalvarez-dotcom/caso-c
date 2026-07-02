package com.sanosysalvos.bff_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "MUNICIPALIDADES-SERVICE", contextId = "campanaClient")
public interface CampanaClient {

    @GetMapping("/api/campanas")
    String obtenerCampanas(@RequestHeader("Authorization") String authorization);

    @GetMapping("/api/campanas/municipalidad/{municipalidadId}")
    String obtenerCampanasPorMunicipalidad(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("municipalidadId") Long municipalidadId);

    @PostMapping(value = "/api/campanas", headers = "Content-Type=application/json")
    String crearCampana(
            @RequestHeader("Authorization") String authorization,
            @RequestBody String body);

    @DeleteMapping("/api/campanas/{id}")
    void eliminarCampana(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id);
}
