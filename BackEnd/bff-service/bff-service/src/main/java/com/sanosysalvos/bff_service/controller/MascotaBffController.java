package com.sanosysalvos.bff_service.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanosysalvos.bff_service.client.MascotaClient;
import com.sanosysalvos.bff_service.dto.MascotaDTO;
import com.sanosysalvos.bff_service.model_Mascota.Mascota;

import org.springframework.http.MediaType;

import java.util.List;

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
    public List<Mascota> obtenerMascotas(@RequestHeader("Authorization") String authorization) {
        return mascotaClient.obtenerMascotas(authorization);
    }

    @PostMapping(value = "/mascotas", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String registrarMascota(
            @RequestHeader("Authorization") String authorization,
            @RequestPart("imagen") MultipartFile imagen,
            @RequestPart("mascota") MascotaDTO mascotaDTO) throws Exception {
        
        ObjectMapper mapper = new ObjectMapper();
        String mascotaJson = mapper.writeValueAsString(mascotaDTO);
        return mascotaClient.registrarMascota(authorization, imagen, mascotaJson);
    }

}
