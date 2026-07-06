package com.sanosysalvos.municipalidades_service.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sanosysalvos.municipalidades_service.dto.MascotaDatosDTO;
import com.sanosysalvos.municipalidades_service.model.Mascota;
import com.sanosysalvos.municipalidades_service.service.MascotaService;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(originPatterns = "*")
public class MascotaController {

    private final MascotaService mascotaService;

    public MascotaController(MascotaService mascotaService) {
        this.mascotaService = mascotaService;
    }

    @GetMapping
    public List<Mascota> getAllMascotas() {
        return mascotaService.obtenerTodasLasMascotas();
    }

    @GetMapping("/municipalidad/{idMunicipalidad}")
    public List<Mascota> listarPorMunicipalidad(@PathVariable Long idMunicipalidad) {
        return mascotaService.listarPorMunicipalidad(idMunicipalidad);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mascota createMascota(
            @RequestPart("mascota") MascotaDatosDTO mascotaDTO,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Long idTipoRaza = (mascotaDTO.getTipoRaza() != null) ? mascotaDTO.getTipoRaza().getIdTipoRaza() : null;

        Long idTipoMascota = (mascotaDTO.getTipoMascota() != null) ? mascotaDTO.getTipoMascota().getIdTipoMascota()
                : null;
        return mascotaService.registrarMascota(mascotaDTO, idTipoRaza, idTipoMascota, file);
    }
}