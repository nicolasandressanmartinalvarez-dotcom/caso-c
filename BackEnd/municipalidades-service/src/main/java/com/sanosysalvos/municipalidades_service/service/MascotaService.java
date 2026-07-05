package com.sanosysalvos.municipalidades_service.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sanosysalvos.municipalidades_service.repository.MascotaRepository;
import com.sanosysalvos.municipalidades_service.repository.TipoRazaRepository;
import com.sanosysalvos.municipalidades_service.repository.TipoMascotaRepository; // Importar nuevo repositorio
import com.sanosysalvos.municipalidades_service.dto.MascotaDatosDTO;
import com.sanosysalvos.municipalidades_service.model.Mascota;
import com.sanosysalvos.municipalidades_service.model.TipoRaza;
import com.sanosysalvos.municipalidades_service.model.TipoMascota; // Importar nuevo modelo

@Service
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Autowired
    private TipoRazaRepository tipoRazaRepository;

    @Autowired
    private TipoMascotaRepository tipoMascotaRepository; // Inyectar nuevo repositorio

    public List<Mascota> obtenerTodasLasMascotas() {
        return mascotaRepository.findAll();
    }

    // Firma modificada agregando: Long idTipoMascota
    public Mascota registrarMascota(MascotaDatosDTO mascotaDTO, Long idTipoRaza, Long idTipoMascota,
            MultipartFile imagenArchivo) {

        TipoRaza tipoRaza = null;
        if (idTipoRaza != null) {
            tipoRaza = tipoRazaRepository.findById(idTipoRaza).orElse(null);
        }

        // Buscar el Tipo de Mascota en la BD
        TipoMascota tipoMascota = null;
        if (idTipoMascota != null) {
            tipoMascota = tipoMascotaRepository.findById(idTipoMascota).orElse(null);
        }

        Mascota mascota = new Mascota();
        mascota.setNombre(mascotaDTO.getNombre());
        mascota.setDescripcion(mascotaDTO.getDescripcion());
        mascota.setCorreoReportante(mascotaDTO.getCorreoReportante());
        mascota.setLatitud(mascotaDTO.getLatitud());
        mascota.setLongitud(mascotaDTO.getLongitud());
        
        mascota.setColor(mascotaDTO.getColor());
        mascota.setTamanio(mascotaDTO.getTamanio());
        mascota.setGenero(mascotaDTO.getGenero());
        mascota.setEntidadReportante("Municipalidad");

        // Asignar Estado de Mascota
        if (mascotaDTO.getEstado() != null) {
            mascota.setEstado(mascotaDTO.getEstado());
        }

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

        if (tipoRaza != null) {
            mascota.setTipoDeRaza(tipoRaza);
        }

        // Asignar el Tipo de Mascota si se encontró
        if (tipoMascota != null) {
            mascota.setTipoMascota(tipoMascota);
        }

        return mascotaRepository.save(mascota);
    }
}
