package com.sanosysalvos.bff_service.client;

import com.sanosysalvos.bff_service.dto.MascotaDatosDTO;
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
            @RequestPart("mascota") MascotaDatosDTO mascotaDTO,
            @RequestPart(value = "file", required = false) MultipartFile file);
}