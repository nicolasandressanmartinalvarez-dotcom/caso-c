package com.api.api_veterinaria.service;

import com.api.api_veterinaria.model.TipoRaza;
import com.api.api_veterinaria.repository.TipoRazaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoRazaService {

    @Autowired
    private TipoRazaRepository tipoRazaRepository;

    // LISTAR TODAS LAS RAZAS
    public List<TipoRaza> listarTodos() {
        return tipoRazaRepository.findAll();
    }

    // OBTENER POR ID
    public TipoRaza obtenerPorId(Long id) {
        return tipoRazaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TipoRaza no encontrada"));
    }

    // GUARDAR (opcional admin)
    public TipoRaza guardar(TipoRaza tipoRaza) {
        return tipoRazaRepository.save(tipoRaza);
    }
}