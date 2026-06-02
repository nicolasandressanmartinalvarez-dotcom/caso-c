package com.sanosysalvos.mascotas_service.controller;

import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.repository.MascotaRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bff")
@CrossOrigin("*")
public class MascotaMapaController {

    private final MascotaRepository mascotaRepository;

    public MascotaMapaController(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    @GetMapping("/mascotas-mapa")
    public List<Mascota> obtenerMascotasParaMapa() {
        return mascotaRepository.findAll();
    }
}