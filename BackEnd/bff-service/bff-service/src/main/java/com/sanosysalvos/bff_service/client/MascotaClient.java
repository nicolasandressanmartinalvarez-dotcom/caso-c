package com.sanosysalvos.bff_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "MASCOTAS-SERVICE")
public interface MascotaClient {

    @GetMapping("/api/mascotas")
    String obtenerMascotas(@RequestHeader("Authorization") String authorization);

    @PostMapping(value = "/api/mascotas", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String registrarMascota(
            @RequestHeader("Authorization") String authorization,
            @RequestPart("imagen") MultipartFile imagen,
            @RequestPart("nombre") String nombre,
            @RequestPart("descripcion") String descripcion,
            @RequestPart("tipoDeRaza") String tipoDeRaza,
            @RequestPart("latitud") String latitud,
            @RequestPart("longitud") String longitud,
            @RequestPart("correoReportante") String correoReportante
    );
}