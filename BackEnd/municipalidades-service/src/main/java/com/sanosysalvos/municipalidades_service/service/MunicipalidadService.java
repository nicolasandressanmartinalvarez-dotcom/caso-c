package com.sanosysalvos.municipalidades_service.service;

import com.sanosysalvos.municipalidades_service.model.Municipalidad;
import com.sanosysalvos.municipalidades_service.repository.MunicipalidadRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MunicipalidadService {

    private final MunicipalidadRepository repository;

    public MunicipalidadService(MunicipalidadRepository repository) {
        this.repository = repository;
    }

    // Obtener todas las municipalidades
    public List<Municipalidad> obtenerTodas() {
        return repository.findAll();
    }

    // Obtener una municipalidad por ID
    public Optional<Municipalidad> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    // Crear o guardar una municipalidad
    public Municipalidad guardar(Municipalidad municipalidad) {
        if (municipalidad.getMascotas() != null) {
            municipalidad.getMascotas().forEach(mascota -> mascota.setMunicipalidad(municipalidad));
        }
        return repository.save(municipalidad);
    }

    // Eliminar una municipalidad
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
