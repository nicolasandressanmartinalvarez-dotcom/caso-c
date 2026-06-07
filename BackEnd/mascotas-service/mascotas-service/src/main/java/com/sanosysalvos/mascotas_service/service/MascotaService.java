package com.sanosysalvos.mascotas_service.service;

<<<<<<< HEAD
import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import com.sanosysalvos.mascotas_service.model.Mascota;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

=======
import java.io.IOException;
>>>>>>> Nico
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import com.sanosysalvos.mascotas_service.Repository.TipoRazaRepository;
import com.sanosysalvos.mascotas_service.dto.MascotaDatosDTO;
import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.model.TipoRaza;

@Service
public class MascotaService {

<<<<<<< HEAD
    @Autowired
    private MascotaRepository mascotaRepository;

    public List<Mascota> obtenerTodasLasMascotas() {
        return mascotaRepository.findAll();
    }

    public Mascota registrarMascota(
            String nombre,
            String descripcion,
            String tipoDeRaza,
            String correoReportante,
            Double latitud,
            Double longitud,
            MultipartFile imagenArchivo) {

        Mascota mascota = new Mascota();
        mascota.setNombre(nombre);
        mascota.setDescripcion(descripcion);
        mascota.setTipoDeRaza(tipoDeRaza);
        mascota.setCorreoReportante(correoReportante);
        mascota.setLatitud(latitud);
        mascota.setLongitud(longitud);

        if (imagenArchivo != null && !imagenArchivo.isEmpty()) {
            try {
                String originalName = imagenArchivo.getOriginalFilename().replace(" ", "_");
                String fileName = System.currentTimeMillis() + "_" + originalName;
                Path path = Paths.get("uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, imagenArchivo.getBytes());
                mascota.setImagen(fileName);
            } catch (Exception e) {
                throw new RuntimeException("Error al guardar la imagen en el servidor", e);
            }
        }

        Mascota nuevaMascota = mascotaRepository.save(mascota);
        return nuevaMascota;
=======
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
>>>>>>> Nico
    }
}