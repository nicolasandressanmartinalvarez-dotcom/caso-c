package com.sanosysalvos.mascotas_service.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanosysalvos.mascotas_service.dto.MascotaDatosDTO;
import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.service.MascotaService;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin("*")
public class MascotaController {

    private final MascotaService mascotaService;

    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    @GetMapping
    public List<Mascota> getAllMascotas() {
        return mascotaService.obtenerTodasLasMascotas();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mascota createMascota(
            @RequestPart("mascota") String mascotaJson,
            @RequestPart(value = "file", required = false) MultipartFile file) throws Exception {
        
        ObjectMapper mapper = new ObjectMapper();
        MascotaDatosDTO mascotaDTO = mapper.readValue(mascotaJson, MascotaDatosDTO.class);
        
        Long idTipoRaza = (mascotaDTO.getTipoRaza() != null) ? mascotaDTO.getTipoRaza().getIdTipoRaza() : null;
        Long idTipoMascota = (mascotaDTO.getTipoMascota() != null) ? mascotaDTO.getTipoMascota().getIdTipoMascota() : null;
        
        return mascotaService.registrarMascota(mascotaDTO, idTipoRaza, idTipoMascota, file);
    }
}