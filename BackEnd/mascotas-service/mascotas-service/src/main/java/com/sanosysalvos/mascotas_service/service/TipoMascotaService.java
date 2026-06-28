package com.sanosysalvos.mascotas_service.service;

import com.sanosysalvos.mascotas_service.model.TipoMascota;
import com.sanosysalvos.mascotas_service.Repository.TipoMascotaRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TipoMascotaService {

    private final TipoMascotaRepository tipoMascotaRepository;

    public TipoMascotaService(TipoMascotaRepository tipoMascotaRepository) {
        this.tipoMascotaRepository = tipoMascotaRepository;
    }

    public List<TipoMascota> obtenerTodosLosTiposDeMascota() {
        return tipoMascotaRepository.findAll();
    }

    public TipoMascota guardarTipoMascota(TipoMascota tipoMascota) {
        return tipoMascotaRepository.save(tipoMascota);
    }

    public TipoMascota buscarTipoMascotaPorId(Long id) {
        return tipoMascotaRepository.findById(id).orElse(null);
    }
}
