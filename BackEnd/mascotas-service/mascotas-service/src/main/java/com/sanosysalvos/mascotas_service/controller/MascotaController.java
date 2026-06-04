package com.sanosysalvos.mascotas_service.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}