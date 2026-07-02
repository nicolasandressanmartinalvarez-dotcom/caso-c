package com.api.api_veterinaria.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.api_veterinaria.model.TipoMascota;
import com.api.api_veterinaria.service.TipoMascotaService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/mascotas/tipo-mascota")
@RequiredArgsConstructor
public class TipoMascotaController {
    
    private final TipoMascotaService tipoMascotaService;

    @GetMapping
    public List<TipoMascota> todosTiposMascotas(){
        return tipoMascotaService.listarTodos();
    }

    @GetMapping("{id}")
    public TipoMascota tipoMascotaPorId(@PathVariable Long id) {
        return tipoMascotaService.obtenerPorId(id);
    }

    @PostMapping
    public TipoMascota guardarTipoMascota(@RequestBody TipoMascota tipoMascota) {
        return tipoMascotaService.guardar(tipoMascota);
    }
    
    
}