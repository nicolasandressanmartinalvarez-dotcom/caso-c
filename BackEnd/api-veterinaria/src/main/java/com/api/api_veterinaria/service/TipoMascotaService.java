package com.api.api_veterinaria.service;

import com.api.api_veterinaria.model.TipoMascota;
import com.api.api_veterinaria.repository.TipoMascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoMascotaService {

    @Autowired
    private TipoMascotaRepository tipoMascotaRepository;

    // LISTAR TODOS LOS TIPOS
    public List<TipoMascota> listarTodos() {
        return tipoMascotaRepository.findAll();
    }

    // OBTENER POR ID
    public TipoMascota obtenerPorId(Long id) {
        return tipoMascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TipoMascota no encontrado"));
    }

    // GUARDAR (opcional para admin)
    public TipoMascota guardar(TipoMascota tipoMascota) {
        return tipoMascotaRepository.save(tipoMascota);
    }
}