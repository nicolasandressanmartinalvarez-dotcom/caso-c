package com.sanosysalvos.bff_service.controller;

import com.sanosysalvos.bff_service.client.MunicipalidadClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bff")
@CrossOrigin("*")
public class MunicipalidadBffController {

    @Autowired
    private MunicipalidadClient municipalidadClient;

    @GetMapping("/municipalidades")
    public String obtenerMunicipalidades(
            @RequestHeader("Authorization") String authorization) {
        return municipalidadClient.obtenerMunicipalidades(authorization);
    }

    @GetMapping("/municipalidades/{id}")
    public String obtenerMunicipalidadPorId(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) {
        return municipalidadClient.obtenerMunicipalidadPorId(authorization, id);
    }

    @PostMapping("/municipalidades")
    public String crearMunicipalidad(
            @RequestHeader("Authorization") String authorization,
            @RequestBody String body) {
        return municipalidadClient.crearMunicipalidad(authorization, body);
    }
}
