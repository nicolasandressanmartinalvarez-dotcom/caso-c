package com.sanosysalvos.mascotas_service.mapper;

import com.sanosysalvos.mascotas_service.dto.MascotaResponseDTO;
import com.sanosysalvos.mascotas_service.model.Mascota;
import org.springframework.stereotype.Component;

@Component
public class MascotaMapper {

    /**
     * Convierte una entidad Mascota a MascotaResponseDTO
     */
    public MascotaResponseDTO toResponseDTO(Mascota mascota) {
        if (mascota == null) {
            return null;
        }

        MascotaResponseDTO dto = new MascotaResponseDTO();
        dto.setId(mascota.getId());
        dto.setNombre(mascota.getNombre());
        dto.setDescripcion(mascota.getDescripcion());
        dto.setTipoDeRaza(mascota.getTipoDeRaza());
        dto.setDireccion(mascota.getDireccion());
        dto.setCorreoReportante(mascota.getCorreoReportante());
        dto.setImagen(mascota.getImagen());
        dto.setLatitud(mascota.getLatitud());
        dto.setLongitud(mascota.getLongitud());

        return dto;
    }
}
