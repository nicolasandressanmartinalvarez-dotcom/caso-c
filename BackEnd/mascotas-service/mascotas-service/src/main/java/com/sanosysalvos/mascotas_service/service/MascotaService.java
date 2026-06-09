package com.sanosysalvos.mascotas_service.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sanosysalvos.mascotas_service.repository.MascotaRepository;
import com.sanosysalvos.mascotas_service.repository.TipoRazaRepository;
import com.sanosysalvos.mascotas_service.dto.MascotaDatosDTO;
import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.model.TipoRaza;

@Service
public class MascotaService {

    private final MascotaRepository mascotaRepository;
    private final TipoRazaRepository tipoRazaRepository;
    private final String CARPETA_IMAGENES = "uploads";

    public MascotaService(MascotaRepository mascotaRepository, TipoRazaRepository tipoRazaRepository) {
        this.mascotaRepository = mascotaRepository;
        this.tipoRazaRepository = tipoRazaRepository;
    }

    // Todas las mascotas
    public List<Mascota> obtenerTodasLasMascotas() {
        return mascotaRepository.findAll();
    }

    // Guardar Mascota
    public Mascota registrarMascota(MascotaDatosDTO mascotaDTO, Long idTipoRaza, MultipartFile imagen)
            throws IOException {

        TipoRaza tipoRaza = null;
        if (idTipoRaza != null) {
            tipoRaza = tipoRazaRepository.findById(idTipoRaza).orElse(null);
        }

        Mascota mascota = new Mascota();

        mascota.setNombre(mascotaDTO.getNombre());
        mascota.setDescripcion(mascotaDTO.getDescripcion());
        mascota.setDireccion(mascotaDTO.getDireccion());
        mascota.setCorreoReportante(mascotaDTO.getCorreoReportante());
        mascota.setLatitud(mascotaDTO.getLatitud());
        mascota.setLongitud(mascotaDTO.getLongitud());

        // Crear ruta imagen (Idéntico a ProductoService)
        if (imagen != null && !imagen.isEmpty()) {
            String nombreDeImagen = UUID.randomUUID().toString() + "_" + imagen.getOriginalFilename();
            Path rutaImagen = Paths.get(CARPETA_IMAGENES).resolve(nombreDeImagen).toAbsolutePath();
            Files.createDirectories(rutaImagen.getParent());
            Files.copy(imagen.getInputStream(), rutaImagen);
            mascota.setImagen(nombreDeImagen);
        }

        if (tipoRaza != null) {
            mascota.setTipoDeRaza(tipoRaza);
        }

        return mascotaRepository.save(mascota);
    }
}