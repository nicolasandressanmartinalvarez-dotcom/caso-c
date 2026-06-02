package com.sanosysalvos.mascotas_service.controller;

import com.sanosysalvos.mascotas_service.dto.MascotaResponseDTO;
import com.sanosysalvos.mascotas_service.service.MascotaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin("*")
public class MascotaController {

    private final MascotaService mascotaService;

    // Inyectamos el servicio por constructor
    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    @GetMapping
    public List<MascotaResponseDTO> getAllMascotas() {
        return mascotaService.obtenerTodasLasMascotas();
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<MascotaResponseDTO> createMascota(Authentication authentication,
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("tipoDeRaza") String tipoDeRaza,
            @RequestParam("correoReportante") String correoReportante,
            @RequestParam("latitud") Double latitud,
            @RequestParam("longitud") Double longitud,
            @RequestParam("imagen") MultipartFile imagenArchivo) {
        try {
            MascotaResponseDTO nuevaMascota = mascotaService.registrarMascota(
                    nombre, descripcion, tipoDeRaza, correoReportante, latitud, longitud, imagenArchivo);
            return new ResponseEntity<>(nuevaMascota, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
