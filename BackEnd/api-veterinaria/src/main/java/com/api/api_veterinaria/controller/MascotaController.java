package com.api.api_veterinaria.controller;

import com.api.api_veterinaria.dto.MascotaDTO;
import com.api.api_veterinaria.model.Mascota;
import com.api.api_veterinaria.service.MascotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@RequiredArgsConstructor
public class MascotaController {

    private final MascotaService mascotaService;

    @GetMapping
    public List<Mascota> listarTodas() {
        return mascotaService.listarTodas();
    }

    @GetMapping("/veterinaria/{idVeterinaria}")
    public List<Mascota> listarPorVeterinaria(@PathVariable Long idVeterinaria) {
        return mascotaService.listarPorVeterinaria(idVeterinaria);
    }

    @GetMapping("/{id}")
    public Mascota obtenerPorId(@PathVariable Long id) {
        return mascotaService.obtenerPorId(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mascota crearMascota(
            @RequestPart("mascota") MascotaDTO dto,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        
        return mascotaService.guardar(dto, file);
    }
}