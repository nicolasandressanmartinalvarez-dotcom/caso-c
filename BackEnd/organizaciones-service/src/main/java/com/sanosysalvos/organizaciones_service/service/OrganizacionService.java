package com.sanosysalvos.organizaciones_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Organizacion crearOrganizacion(Organizacion organizacion) {
        return organizacionRepository.save(organizacion);
    }

    public Organizacion actualizarOrganizacion(Long id, Organizacion organizacionActualizada) {
        Optional<Organizacion> organizacionExistente = organizacionRepository.findById(id);
        
        if (organizacionExistente.isPresent()) {
            Organizacion organizacion = organizacionExistente.get();
            organizacion.setNombre(organizacionActualizada.getNombre());
            organizacion.setTipoOrganizacion(organizacionActualizada.getTipoOrganizacion());
            organizacion.setRut(organizacionActualizada.getRut());
            organizacion.setDireccion(organizacionActualizada.getDireccion());
            organizacion.setTelefono(organizacionActualizada.getTelefono());
            organizacion.setEmail(organizacionActualizada.getEmail());
            organizacion.setMunicipalidad(organizacionActualizada.getMunicipalidad());
            
            return organizacionRepository.save(organizacion);
        } else {
            throw new RuntimeException("Organización no encontrada con ID: " + id);
        }
    }

    public void eliminarOrganizacion(Long id) {
        organizacionRepository.deleteById(id);
    }
}
