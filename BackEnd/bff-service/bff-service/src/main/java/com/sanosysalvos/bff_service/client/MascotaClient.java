package com.sanosysalvos.bff_service.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sanosysalvos.bff_service.config.FeignMultipartConfi;
import com.sanosysalvos.bff_service.model_Mascota.Mascota;


@FeignClient(name = "MASCOTAS-SERVICE", configuration = FeignMultipartConfi.class)
public interface MascotaClient {

    @GetMapping("/api/mascotas")
    List<Mascota> obtenerMascotas(@RequestHeader("Authorization") String authorization);

    @PostMapping(value = "/api/mascotas", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    String registrarMascota(
            @RequestHeader("Authorization") String authorization,
            @RequestPart("file") MultipartFile imagen,
            @RequestPart("mascota") String mascotaJson
    );
}