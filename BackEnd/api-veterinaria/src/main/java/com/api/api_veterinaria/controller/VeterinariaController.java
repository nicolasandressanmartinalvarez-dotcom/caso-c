package com.api.api_veterinaria.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.api.api_veterinaria.dto.VeterinariaDTO;
import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.service.VeterinariaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/veterinaria")
@RequiredArgsConstructor
public class VeterinariaController {

    private final VeterinariaService veterinariaService;

    @GetMapping
    public List<Veterinaria> obtenerTodas() {
        return veterinariaService.obtenerTodos();
    }

    @PostMapping
    public Veterinaria guardar(@RequestBody VeterinariaDTO veterinariaDTO) {
        return veterinariaService.guardar(veterinariaDTO);
    }

    @DeleteMapping("{id}")
    public String borrarUser(@PathVariable Long id){
        veterinariaService.buscarPorId(id);
        return "Usuario Borrado de la veterinaria";
    }
}