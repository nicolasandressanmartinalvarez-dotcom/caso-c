package com.sanosysalvos.organizaciones_service.controller;

import com.sanosysalvos.organizaciones_service.model.Mascota;
import com.sanosysalvos.organizaciones_service.service.MascotaService;
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
    public List<Mascota> obtenerMascotasParaMapa() {
        return mascotaService.obtenerTodasLasMascotas();
    }
}
