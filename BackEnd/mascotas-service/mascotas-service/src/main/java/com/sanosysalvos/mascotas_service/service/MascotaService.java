package com.sanosysalvos.mascotas_service.service;

import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import com.sanosysalvos.mascotas_service.model.Mascota;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class MascotaService {

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
    }
}
