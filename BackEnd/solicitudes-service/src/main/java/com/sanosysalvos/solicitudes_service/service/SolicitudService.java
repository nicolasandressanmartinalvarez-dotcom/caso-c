package com.sanosysalvos.solicitudes_service.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.sanosysalvos.solicitudes_service.dto.SolicitudDTO;
import com.sanosysalvos.solicitudes_service.model.Solicitud;
import com.sanosysalvos.solicitudes_service.repository.SolicitudRepository;

@Service
@RequiredArgsConstructor
public class SolicitudService {

    private final SolicitudRepository repository;

    public List<SolicitudDTO> obtenerTodas() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<SolicitudDTO> obtenerPorId(Long id) {
        return repository.findById(id).map(this::convertToDTO);
    }

    public SolicitudDTO crear(SolicitudDTO dto) {
        Solicitud solicitud = convertToEntity(dto);
        
        // Auto-generate code if not provided
        if (solicitud.getCodigoSolicitud() == null || solicitud.getCodigoSolicitud().trim().isEmpty()) {
            long nextId = repository.count() + 1;
            solicitud.setCodigoSolicitud("SOL-" + String.format("%04d", nextId));
        }
        
        solicitud.setFechaCreacion(LocalDateTime.now());
        if (solicitud.getEstadoSolicitud() == null || solicitud.getEstadoSolicitud().trim().isEmpty()) {
            solicitud.setEstadoSolicitud("PENDIENTE");
        }
        
        Solicitud guardada = repository.save(solicitud);
        return convertToDTO(guardada);
    }

    public SolicitudDTO actualizar(Long id, SolicitudDTO dto) {
        return repository.findById(id).map(solicitud -> {
            solicitud.setTipoSolicitud(dto.getTipoSolicitud());
            solicitud.setMensaje(dto.getMensaje());
            solicitud.setTipoEmisor(dto.getTipoEmisor());
            solicitud.setCorreoEmisor(dto.getCorreoEmisor());
            solicitud.setCorreoGestor(dto.getCorreoGestor());
            
            // Check if status changed to resolved
            String antiguoEstado = solicitud.getEstadoSolicitud();
            String nuevoEstado = dto.getEstadoSolicitud();
            solicitud.setEstadoSolicitud(nuevoEstado);
            
            if (nuevoEstado != null && !nuevoEstado.equalsIgnoreCase(antiguoEstado)) {
                if (nuevoEstado.equalsIgnoreCase("APROBADA") || nuevoEstado.equalsIgnoreCase("RECHAZADA")) {
                    solicitud.setFechaResolucion(LocalDateTime.now());
                }
            }
            
            Solicitud actualizada = repository.save(solicitud);
            return convertToDTO(actualizada);
        }).orElseThrow(() -> new RuntimeException("Solicitud no encontrada con ID: " + id));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    // Helper mapping methods
    private SolicitudDTO convertToDTO(Solicitud entity) {
        SolicitudDTO dto = new SolicitudDTO();
        dto.setId(entity.getId());
        dto.setCodigoSolicitud(entity.getCodigoSolicitud());
        dto.setTipoSolicitud(entity.getTipoSolicitud());
        dto.setMensaje(entity.getMensaje());
        dto.setTipoEmisor(entity.getTipoEmisor());
        dto.setCorreoEmisor(entity.getCorreoEmisor());
        dto.setCorreoGestor(entity.getCorreoGestor());
        dto.setEstadoSolicitud(entity.getEstadoSolicitud());
        dto.setFechaCreacion(entity.getFechaCreacion());
        dto.setFechaResolucion(entity.getFechaResolucion());
        return dto;
    }

    private Solicitud convertToEntity(SolicitudDTO dto) {
        Solicitud entity = new Solicitud();
        entity.setId(dto.getId());
        entity.setCodigoSolicitud(dto.getCodigoSolicitud());
        entity.setTipoSolicitud(dto.getTipoSolicitud());
        entity.setMensaje(dto.getMensaje());
        entity.setTipoEmisor(dto.getTipoEmisor());
        entity.setCorreoEmisor(dto.getCorreoEmisor());
        entity.setCorreoGestor(dto.getCorreoGestor());
        entity.setEstadoSolicitud(dto.getEstadoSolicitud());
        entity.setFechaCreacion(dto.getFechaCreacion());
        entity.setFechaResolucion(dto.getFechaResolucion());
        return entity;
    }
}
