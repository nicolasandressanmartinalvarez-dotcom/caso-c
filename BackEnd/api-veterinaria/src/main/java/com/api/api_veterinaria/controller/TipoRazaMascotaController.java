package com.api.api_veterinaria.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.api_veterinaria.model.TipoRaza;
import com.api.api_veterinaria.service.TipoRazaService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("api/mascotas/raza-mascota")
@RequiredArgsConstructor
public class TipoRazaMascotaController {
    
    private  final TipoRazaService tipoRazaMasc;
    
    @GetMapping
    public List<TipoRaza> todasLasRazas() {
        return tipoRazaMasc.listarTodos();
    }
    //Raza por ID
    @GetMapping("{id}")
    public TipoRaza razaPorId(@PathVariable Long id) {
        return tipoRazaMasc.obtenerPorId(id);
    }

    @PostMapping
    public TipoRaza guardarTipoRaza(@RequestBody TipoRaza tipoRaza) {
        return tipoRazaMasc.guardar(tipoRaza);
    }
    
    
    
    
}
