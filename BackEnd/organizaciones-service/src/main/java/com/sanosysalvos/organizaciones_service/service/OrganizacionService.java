package com.sanosysalvos.organizaciones_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanosysalvos.organizaciones_service.dto.OrganizacionDTO;
import com.sanosysalvos.organizaciones_service.model.Organizacion;
import com.sanosysalvos.organizaciones_service.repository.OrganizacionRepository;

@Service
public class OrganizacionService {

    @Autowired
    private OrganizacionRepository organizacionRepository;

    public List<Organizacion> obtenerTodasLasOrganizaciones() {
        return organizacionRepository.findAll();
    }

    public Optional<Organizacion> obtenerOrganizacionPorId(Long id) {
        return organizacionRepository.findById(id);
    }

    public Organizacion crearOrganizacion(OrganizacionDTO organizacionDTO) {
        Organizacion organizacion = new Organizacion();
        organizacion.setNombre(organizacionDTO.getNombre());
        organizacion.setTipoOrganizacion(organizacionDTO.getTipoOrganizacion());
        organizacion.setRut(organizacionDTO.getRut());
        organizacion.setDireccion(organizacionDTO.getDireccion());
        organizacion.setTelefono(organizacionDTO.getTelefono());
        organizacion.setEmail(organizacionDTO.getEmail());
        organizacion.setMunicipalidadId(organizacionDTO.getMunicipalidadId());

        return organizacionRepository.save(organizacion);
    }

    public Organizacion actualizarOrganizacion(Long id, OrganizacionDTO organizacionDTO) {
        Optional<Organizacion> organizacionExistente = organizacionRepository.findById(id);
        
        if (organizacionExistente.isPresent()) {
            Organizacion organizacion = organizacionExistente.get();
            organizacion.setNombre(organizacionDTO.getNombre());
            organizacion.setTipoOrganizacion(organizacionDTO.getTipoOrganizacion());
            organizacion.setRut(organizacionDTO.getRut());
            organizacion.setDireccion(organizacionDTO.getDireccion());
            organizacion.setTelefono(organizacionDTO.getTelefono());
            organizacion.setEmail(organizacionDTO.getEmail());
            organizacion.setMunicipalidadId(organizacionDTO.getMunicipalidadId());
            
            return organizacionRepository.save(organizacion);
        } else {
            throw new RuntimeException("Organización no encontrada con ID: " + id);
        }
    }

    public void eliminarOrganizacion(Long id) {
        organizacionRepository.deleteById(id);
    }
}
