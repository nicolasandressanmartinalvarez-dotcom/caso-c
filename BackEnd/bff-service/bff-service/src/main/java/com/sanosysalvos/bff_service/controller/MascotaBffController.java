package com.sanosysalvos.bff_service.controller;

import com.sanosysalvos.bff_service.client.MascotaClient;
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
            @RequestPart("imagen") MultipartFile imagen,
            @RequestPart("nombre") String nombre,
            @RequestPart("descripcion") String descripcion,
            @RequestPart("color") String color,
            @RequestPart("tamanio") String tamanio,
            @RequestPart("entidadReportante") String entidadReportante,
            @RequestPart("tipoDeRaza") String tipoDeRaza,
            @RequestPart("latitud") String latitud,
            @RequestPart("longitud") String longitud,
            @RequestPart("correoReportante") String correoReportante) {
        return mascotaClient.registrarMascota(
                authorization,
                imagen,
                nombre,
                descripcion,
                color,
                tamanio,
                entidadReportante,
                tipoDeRaza,
                latitud,
                longitud,
                correoReportante);
    }

}
