package com.sanosysalvos.mascotas_service.service;

import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import com.sanosysalvos.mascotas_service.dto.MascotaResponseDTO;
import com.sanosysalvos.mascotas_service.mapper.MascotaMapper;
import com.sanosysalvos.mascotas_service.model.Mascota;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class MascotaService {

    private final MascotaRepository mascotaRepository;
    private final MascotaMapper mascotaMapper;

    // Inyectamos el Repositorio y el Mapeador por constructor
    public MascotaService(MascotaRepository mascotaRepository, MascotaMapper mascotaMapper) {
        this.mascotaRepository = mascotaRepository;
        this.mascotaMapper = mascotaMapper;
    }

    /**
     * Obtiene todas las mascotas y las convierte a DTOs de respuesta
     */
    public List<MascotaResponseDTO> obtenerTodasLasMascotas() {
        return mascotaRepository.findAll().stream()
                .map(mascotaMapper::toResponseDTO)
                .toList();
    }

    /**
     * lógica para registrar una mascota, incluyendo la subida física de la imagen
     */
    public MascotaResponseDTO registrarMascota(
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

        // Lógica física de guardado de imagen
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
        return mascotaMapper.toResponseDTO(nuevaMascota);
    }
}
