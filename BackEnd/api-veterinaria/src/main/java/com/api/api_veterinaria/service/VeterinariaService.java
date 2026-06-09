package com.api.api_veterinaria.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.repository.VeterinariaRepository;

@Service
public class VeterinariaService {

    @Autowired
    private VeterinariaRepository veterinariaRepository;

    public List<Veterinaria> obtenerTodos() {
        return veterinariaRepository.findAll();
    }

    public Veterinaria guardar(Veterinaria veterinaria) {
        return veterinariaRepository.save(veterinaria);
    }
}