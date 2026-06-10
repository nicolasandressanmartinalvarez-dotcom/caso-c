package com.sanosysalvos.bff_service.controller;

import com.sanosysalvos.bff_service.client.MascotaClient;
import com.sanosysalvos.bff_service.dto.MascotaDatosDTO;
import com.sanosysalvos.bff_service.dto.MascotaDatosDTO;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bff")
@CrossOrigin("*")

public class MascotaBffController {

    private final MascotaClient mascotaClient;

    public MascotaBffController(MascotaClient mascotaClient) {
        this.mascotaClient = mascotaClient;
    }

    @GetMapping("/mascotas")
    public String obtenerMascotas(@RequestHeader("Authorization") String authorization) {
        return mascotaClient.obtenerMascotas(authorization);
    }

    @PostMapping("/mascotas")
    public String registrarMascota(
            @RequestHeader("Authorization") String authorization,
            @RequestPart("mascota") MascotaDatosDTO mascotaDTO,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        return mascotaClient.registrarMascota(
                authorization,
                mascotaDTO,
                file);
    }

}
