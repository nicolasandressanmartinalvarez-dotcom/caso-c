package com.sanosysalvos.organizaciones_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanosysalvos.organizaciones_service.model.Organizacion;
import com.sanosysalvos.organizaciones_service.service.OrganizacionService;

@RestController
@RequestMapping("/api/organizaciones")
public class OrganizacionController {

    @Autowired
    private OrganizacionService organizacionService;

    @GetMapping
    public ResponseEntity<List<Organizacion>> obtenerTodasLasOrganizaciones() {
        return ResponseEntity.ok(organizacionService.obtenerTodasLasOrganizaciones());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Organizacion> obtenerOrganizacionPorId(@PathVariable Long id) {
        return organizacionService.obtenerOrganizacionPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Organizacion> registrarOrganizacion(@RequestBody Organizacion organizacion) {
        Organizacion nuevaOrganizacion = organizacionService.crearOrganizacion(organizacion);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOrganizacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Organizacion> actualizarOrganizacion(@PathVariable Long id, @RequestBody Organizacion organizacion) {
        try {
            Organizacion organizacionActualizada = organizacionService.actualizarOrganizacion(id, organizacion);
            return ResponseEntity.ok(organizacionActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOrganizacion(@PathVariable Long id) {
        try {
            organizacionService.eliminarOrganizacion(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
