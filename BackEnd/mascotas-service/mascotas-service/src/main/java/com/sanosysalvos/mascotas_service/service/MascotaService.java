package com.sanosysalvos.mascotas_service.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import com.sanosysalvos.mascotas_service.model.Mascota;

@Service
public class MascotaService {

    private final MascotaRepository mascotaRepository;

    public MascotaService(MascotaRepository mascotaRepository) {
        this.mascotaRepository = mascotaRepository;
    }

    // Todas las mascotas
    public List<Mascota> obtenerTodasLasMascotas() {
        return mascotaRepository.findAll();
    }

}