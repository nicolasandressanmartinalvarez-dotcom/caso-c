package com.api.api_veterinaria.service;

import com.api.api_veterinaria.dto.MascotaDTO;
import com.api.api_veterinaria.model.Mascota;
import com.api.api_veterinaria.model.TipoMascota;
import com.api.api_veterinaria.model.TipoRaza;
import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.repository.MascotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MascotaService {

    private final MascotaRepository mascotaRepository;
    private final TipoMascotaService tipoMascotaService;
    private final TipoRazaService tipoRazaService;
    private final VeterinariaService veterinariaService;

    public List<Mascota> listarTodas() {
        return mascotaRepository.findAll();
    }

    public List<Mascota> listarPorVeterinaria(Long idVeterinaria) {
        return mascotaRepository.findAll()
                .stream()
                .filter(m -> m.getVeterinaria() != null
                        && m.getVeterinaria().getId().equals(idVeterinaria))
                .toList();
    }

    public Mascota obtenerPorId(Long id) {
        return mascotaRepository.findById(id).orElse(null);
    }

    // --- MÉTODO ACTUALIZADO PARA RECIBIR EL ARCHIVO ---
    public Mascota guardar(MascotaDTO dto, MultipartFile imagenArchivo) {

        Mascota mascota = new Mascota();

        mascota.setNombre(dto.getNombre());
        mascota.setDescripcion(dto.getDescripcion());
        mascota.setCorreoReportante(dto.getCorreoReportante());
        mascota.setLatitud(dto.getLatitud());
        mascota.setLongitud(dto.getLongitud());
        mascota.setEstado(dto.getEstado() != null ? dto.getEstado() : "PERDIDO");
        mascota.setColor(dto.getColor());
        mascota.setGenero(dto.getGenero());
        mascota.setTamanio(dto.getTamanio());
        mascota.setEntidadReportante("Veterinaria");

        if (dto.getTipoMascota() != null) {
            TipoMascota tipoMascota = tipoMascotaService.obtenerPorId(
                    dto.getTipoMascota().getIdTipoMascota()
            );
            mascota.setTipoMascota(tipoMascota);
        }
        
        if (dto.getTipoRaza() != null) {
            TipoRaza tipoRaza = tipoRazaService.obtenerPorId(
                    dto.getTipoRaza().getIdTipoRaza()
            );
            mascota.setTipoDeRaza(tipoRaza);
        }
        
        if (dto.getVeterinaria() != null) {
            Veterinaria vet = veterinariaService.buscarPorId(
                    dto.getVeterinaria().getIdVeterianaria()
            );
            mascota.setVeterinaria(vet);
        }

        // --- LÓGICA DE GUARDADO DE IMAGEN ---
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

        return mascotaRepository.save(mascota);
    }
}