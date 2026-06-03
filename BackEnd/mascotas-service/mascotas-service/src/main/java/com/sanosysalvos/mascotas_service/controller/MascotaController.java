package com.sanosysalvos.mascotas_service.controller;

<<<<<<< HEAD
import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.service.MascotaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
=======
import java.io.IOException;
import java.util.List;
import org.springframework.http.MediaType;
>>>>>>> Nico
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sanosysalvos.mascotas_service.dto.MascotaDatosDTO;
import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.service.MascotaService;
import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin("*")
public class MascotaController {

    private final MascotaService mascotaService;

    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    @GetMapping
<<<<<<< HEAD
    public List<Mascota> getAllMascotas() {
        return mascotaService.obtenerTodasLasMascotas();
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<Mascota> createMascota(Authentication authentication,
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("tipoDeRaza") String tipoDeRaza,
            @RequestParam("correoReportante") String correoReportante,
            @RequestParam("latitud") Double latitud,
            @RequestParam("longitud") Double longitud,
            @RequestParam("imagen") MultipartFile imagenArchivo) {
        try {
            Mascota nuevaMascota = mascotaService.registrarMascota(
                    nombre, descripcion, tipoDeRaza, correoReportante, latitud, longitud, imagenArchivo);
            return new ResponseEntity<>(nuevaMascota, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
=======
    public List<MascotaDatosDTO> getAllMascotas() {
        return mascotaService.obtenerTodasLasMascotas();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MascotaDatosDTO createMascota(
            @RequestPart("mascota") MascotaDatosDTO mascotaDTO,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {

        Long idTipoRaza = (mascotaDTO.getTipoRaza() != null) ? mascotaDTO.getTipoRaza().getIdTipoRaza() : null;

        return mascotaService.registrarMascota(mascotaDTO, idTipoRaza, file);
>>>>>>> Nico
    }
}