package com.api.api_veterinaria.service;

import com.api.api_veterinaria.model.TipoRaza;
import com.api.api_veterinaria.repository.TipoRazaRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoRazaService {

    private final TipoRazaRepository tipoRazaRepository;

    // LISTAR TODAS LAS RAZAS
    public List<TipoRaza> listarTodos() {
        return tipoRazaRepository.findAll();
    }

    // OBTENER POR ID
    public TipoRaza obtenerPorId(Long id) {
        return tipoRazaRepository.findById(id).orElse(null);
    }

    // GUARDAR (opcional admin)
    public TipoRaza guardar(TipoRaza tipoRaza) {
        return tipoRazaRepository.save(tipoRaza);
    }
}