package com.sanosysalvos.organizaciones_service.controller;

import com.sanosysalvos.organizaciones_service.model.TipoMascota;
import com.sanosysalvos.organizaciones_service.service.TipoMascotaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tipos-mascota")
@CrossOrigin(originPatterns = "*")
public class TipoMascotaController {

    private final TipoMascotaService tipoMascotaService;

    public TipoMascotaController(TipoMascotaService tipoMascotaService) {
        this.tipoMascotaService = tipoMascotaService;
    }

    @GetMapping
    public List<TipoMascota> obtenerTodos() {
        return tipoMascotaService.obtenerTodosLosTiposDeMascota();
    }

    @PostMapping
    public TipoMascota guardar(@RequestBody TipoMascota tipoMascota) {
        return tipoMascotaService.guardarTipoMascota(tipoMascota);
    }

    @GetMapping("/{id}")
    public TipoMascota buscarPorId(@PathVariable Long id) {
        return tipoMascotaService.buscarTipoMascotaPorId(id);
    }
}
