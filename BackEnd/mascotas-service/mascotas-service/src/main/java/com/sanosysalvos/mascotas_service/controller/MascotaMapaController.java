package com.sanosysalvos.mascotas_service.controller;

<<<<<<< HEAD
=======
import com.sanosysalvos.mascotas_service.dto.MascotaDatosDTO;
>>>>>>> Nico
import com.sanosysalvos.mascotas_service.model.Mascota;
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
<<<<<<< HEAD
    public List<Mascota> obtenerMascotasParaMapa() {
=======
    public List<MascotaDatosDTO> obtenerMascotasParaMapa() {
>>>>>>> Nico
        return mascotaService.obtenerTodasLasMascotas();
    }
}
