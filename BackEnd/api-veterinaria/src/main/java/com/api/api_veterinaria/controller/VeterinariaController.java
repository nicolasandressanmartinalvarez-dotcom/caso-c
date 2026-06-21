package com.api.api_veterinaria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.service.VeterinariaService;

@RestController
@RequestMapping("/api/veterinaria")
public class VeterinariaController {

    @Autowired
    private VeterinariaService veterinariaService;

    @GetMapping
    public List<Veterinaria> obtenerTodas() {
        return veterinariaService.obtenerTodos();
    }

    @PostMapping
    public Veterinaria guardar(@RequestBody Veterinaria veterinaria) {
        return veterinariaService.guardar(veterinaria);
    }
}