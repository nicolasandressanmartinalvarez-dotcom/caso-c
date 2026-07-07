package com.sanosysalvos.municipalidades_service.controller;

import com.sanosysalvos.municipalidades_service.model.Municipalidad;
import com.sanosysalvos.municipalidades_service.service.MunicipalidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/municipalidades")
@CrossOrigin(origins = "*")
public class MunicipalidadController {

    @Autowired
    private MunicipalidadService service;

    // GET: Obtener todas las municipalidades
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Municipalidad>> listarTodas() {
        return ResponseEntity.ok(service.obtenerTodas());
    }

    // GET: Obtener una municipalidad por ID (incluye su lista de mascotas)
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Municipalidad> buscarPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear una municipalidad
    // 🛠️ Se fuerza explícitamente a consumir y producir JSON para evitar el error 415
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Municipalidad> crear(@RequestBody Municipalidad municipalidad) {
        return ResponseEntity.ok(service.guardar(municipalidad));
    }

    // PUT: Actualizar una municipalidad
    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Municipalidad> actualizar(@PathVariable Long id, @RequestBody Municipalidad municipalidad) {
        return service.obtenerPorId(id)
                .map(existing -> {
                    municipalidad.setId(id);
                    return ResponseEntity.ok(service.guardar(municipalidad));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Eliminar una municipalidad
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (service.obtenerPorId(id).isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}