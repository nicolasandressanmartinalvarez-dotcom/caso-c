package com.sanosysalvos.municipalidades_service.controller;

import com.sanosysalvos.municipalidades_service.model.TipoRaza;
import com.sanosysalvos.municipalidades_service.service.TipoRazaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-raza")
@CrossOrigin("*") 
public class TipoRazaController {

    private final TipoRazaService tipoRazaService;

    public TipoRazaController(TipoRazaService tipoRazaService) {
        this.tipoRazaService = tipoRazaService;
    }

    // Obtener todas las razas
    @GetMapping
    public List<TipoRaza> todasLasRazas() {
        return tipoRazaService.obtenerTodosLosTiposDeRaza();
    }

    // Crear un tipo de raza
    @PostMapping
    public TipoRaza guardarRaza(@RequestBody TipoRaza tipoRaza) {        
        return tipoRazaService.guardarTipoRaza(tipoRaza);
    }

    // Buscar raza por id
    @GetMapping("{id}")
    public TipoRaza buscarPorId(@PathVariable Long id) {
        return tipoRazaService.buscarTipoRazaPorId(id);
    } 
}