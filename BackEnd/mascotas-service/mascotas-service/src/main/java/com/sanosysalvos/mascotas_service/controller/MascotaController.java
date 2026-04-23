package com.sanosysalvos.mascotas_service.controller;

import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mascotas")
@CrossOrigin(origins = "*") 
public class MascotaController {

    @Autowired
    private MascotaRepository mascotaRepository;

    @GetMapping
    public List<Mascota> getAllMascotas() {
        return mascotaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mascota> getMascotaById(@PathVariable Long id) {
        Optional<Mascota> mascota = mascotaRepository.findById(id);
        if (mascota.isPresent()) {
            return ResponseEntity.ok(mascota.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Mascota createMascota(@RequestBody Mascota mascota) {
        return mascotaRepository.save(mascota);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mascota> updateMascota(@PathVariable Long id, @RequestBody Mascota mascotaDetails) {
        Optional<Mascota> mascota = mascotaRepository.findById(id);
        if (mascota.isPresent()) {
            Mascota mascotaToUpdate = mascota.get();
            mascotaToUpdate.setTipo(mascotaDetails.getTipo());
            mascotaToUpdate.setNombre(mascotaDetails.getNombre());
            mascotaToUpdate.setDescripcion(mascotaDetails.getDescripcion());
            mascotaToUpdate.setUbicacion(mascotaDetails.getUbicacion());
            Mascota updatedMascota = mascotaRepository.save(mascotaToUpdate);
            return ResponseEntity.ok(updatedMascota);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMascota(@PathVariable Long id) {
        Optional<Mascota> mascota = mascotaRepository.findById(id);
        if (mascota.isPresent()) {
            mascotaRepository.delete(mascota.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
