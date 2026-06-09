package com.sanosysalvos.mascotas_service.service;

import com.sanosysalvos.mascotas_service.repository.TipoRazaRepository;
import com.sanosysalvos.mascotas_service.model.TipoRaza;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoRazaService {

    private final TipoRazaRepository tipoRazaRepository;

    public TipoRazaService(TipoRazaRepository tipoRazaRepository) {
        this.tipoRazaRepository = tipoRazaRepository;
    }

    // Obtener todas las razas
    public List<TipoRaza> obtenerTodosLosTiposDeRaza() {
        return tipoRazaRepository.findAll();
    }

    // Guardar una nueva raza
    public TipoRaza guardarTipoRaza(TipoRaza tipoRaza) {
        return tipoRazaRepository.save(tipoRaza);
    }

    // Buscar raza por id
    public TipoRaza buscarTipoRazaPorId(Long id) {
        return tipoRazaRepository.findById(id).orElse(null);
    }
}