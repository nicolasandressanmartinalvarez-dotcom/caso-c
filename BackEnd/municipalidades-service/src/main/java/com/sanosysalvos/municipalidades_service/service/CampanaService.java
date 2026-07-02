package com.sanosysalvos.municipalidades_service.service;

import com.sanosysalvos.municipalidades_service.model.Campana;
import com.sanosysalvos.municipalidades_service.repository.CampanaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampanaService {

    private final CampanaRepository repository;

    public CampanaService(CampanaRepository repository) {
        this.repository = repository;
    }

    public List<Campana> obtenerTodas() {
        return repository.findAll();
    }

    public List<Campana> obtenerPorMunicipalidad(Long municipalidadId) {
        return repository.findByMunicipalidadId(municipalidadId);
    }

    public Optional<Campana> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Campana guardar(Campana campana) {
        return repository.save(campana);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
