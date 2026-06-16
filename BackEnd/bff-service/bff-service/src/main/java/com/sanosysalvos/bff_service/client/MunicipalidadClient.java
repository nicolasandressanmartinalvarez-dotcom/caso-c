package com.sanosysalvos.bff_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "MUNICIPALIDADES-SERVICE")
public interface MunicipalidadClient {

    @GetMapping("/api/municipalidades")
    String obtenerMunicipalidades(@RequestHeader("Authorization") String authorization);

    @GetMapping("/api/municipalidades/{id}")
    String obtenerMunicipalidadPorId(
            @RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id);

    @PostMapping("/api/municipalidades")
    String crearMunicipalidad(
            @RequestHeader("Authorization") String authorization,
            @RequestBody String body);
}
