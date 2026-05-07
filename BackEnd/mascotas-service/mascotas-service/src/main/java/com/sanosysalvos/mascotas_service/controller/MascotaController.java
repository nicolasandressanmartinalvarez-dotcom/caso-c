package com.sanosysalvos.mascotas_service.controller;

import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin("*")
public class MascotaController {

    @Autowired
    private MascotaRepository mascotaRepository;

    @GetMapping
    public List<Mascota> getAllMascotas() {
        return mascotaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Mascota> createMascota(Authentication authentication, @RequestBody Mascota mascota) {



        Mascota nuevaMascota = mascotaRepository.save(mascota);
        return new ResponseEntity<>(nuevaMascota, HttpStatus.CREATED);
    }
}
