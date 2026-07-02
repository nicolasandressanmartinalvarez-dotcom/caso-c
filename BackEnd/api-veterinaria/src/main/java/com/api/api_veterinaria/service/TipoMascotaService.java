package com.api.api_veterinaria.service;

import com.api.api_veterinaria.model.TipoMascota;
import com.api.api_veterinaria.repository.TipoMascotaRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoMascotaService{

    private final TipoMascotaRepository tipoMascotaRepository;

    public List<TipoMascota> listarTodos() {
        return tipoMascotaRepository.findAll();
    }

    // OBTENER POR ID
    public TipoMascota obtenerPorId(Long id) {
        return tipoMascotaRepository.findById(id).orElse(null);
    }

    // GUARDAR (opcional para admin)
    public TipoMascota guardar(TipoMascota tipoMascota) {
        return tipoMascotaRepository.save(tipoMascota);
    }
}