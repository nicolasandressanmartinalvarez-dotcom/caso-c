package com.api.api_veterinaria.controller;

import com.api.api_veterinaria.dto.MascotaDTO;
import com.api.api_veterinaria.model.Mascota;
import com.api.api_veterinaria.service.MascotaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "http://localhost:5173")
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    // =========================
    // LISTAR TODAS
    // =========================
    @GetMapping
    public List<Mascota> listarTodas() {
        return mascotaService.listarTodas();
    }

    // =========================
    // LISTAR POR VETERINARIA
    // =========================
    @GetMapping("/veterinaria/{idVeterinaria}")
    public List<Mascota> listarPorVeterinaria(@PathVariable Long idVeterinaria) {
        return mascotaService.listarPorVeterinaria(idVeterinaria);
    }

    
    @GetMapping("/{id}")
    public Mascota obtenerPorId(@PathVariable Long id) {
        return mascotaService.obtenerPorId(id);
    }

    
    @PostMapping
    public Mascota crearMascota(@RequestBody MascotaDTO dto) {
        return mascotaService.guardar(dto);
    }
}