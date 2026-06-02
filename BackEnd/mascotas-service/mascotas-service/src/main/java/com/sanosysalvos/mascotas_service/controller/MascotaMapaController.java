package com.sanosysalvos.mascotas_service.controller;

import com.sanosysalvos.mascotas_service.dto.MascotaResponseDTO;
import com.sanosysalvos.mascotas_service.service.MascotaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bff")
@CrossOrigin("*")
public class MascotaMapaController {

    private final MascotaService mascotaService;

    public MascotaMapaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    @GetMapping("/mascotas-mapa")
    public List<MascotaResponseDTO> obtenerMascotasParaMapa() {
        return mascotaService.obtenerTodasLasMascotas();
    }
}
