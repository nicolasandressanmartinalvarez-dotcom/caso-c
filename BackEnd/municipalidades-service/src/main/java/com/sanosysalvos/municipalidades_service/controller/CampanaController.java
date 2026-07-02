package com.sanosysalvos.municipalidades_service.controller;

import com.sanosysalvos.municipalidades_service.model.Campana;
import com.sanosysalvos.municipalidades_service.service.CampanaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campanas")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class CampanaController {

    private final CampanaService campanaService;

    public CampanaController(CampanaService campanaService) {
        this.campanaService = campanaService;
    }

    // GET: Listar todas las campañas
    @GetMapping
    public ResponseEntity<List<Campana>> listarTodas() {
        return ResponseEntity.ok(campanaService.obtenerTodas());
    }

    // GET: Listar campañas por municipalidad
    @GetMapping("/municipalidad/{municipalidadId}")
    public ResponseEntity<List<Campana>> listarPorMunicipalidad(@PathVariable Long municipalidadId) {
        return ResponseEntity.ok(campanaService.obtenerPorMunicipalidad(municipalidadId));
    }

    // POST: Crear campaña
    @PostMapping
    public ResponseEntity<Campana> crear(@RequestBody Campana campana) {
        return ResponseEntity.ok(campanaService.guardar(campana));
    }

    // DELETE: Eliminar campaña
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (campanaService.obtenerPorId(id).isPresent()) {
            campanaService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
