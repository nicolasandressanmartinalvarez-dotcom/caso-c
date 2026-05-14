package com.sanosysalvos.mascotas_service.controller;

import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bff")
@CrossOrigin("*")
public class MascotaBffController {

    private final MascotaRepository mascotaRepository;

    public MascotaBffController(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    @GetMapping("/mascotas-mapa")
    public List<Mascota> obtenerMascotasParaMapa() {
        return mascotaRepository.findAll();
    }
}