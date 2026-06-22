package com.api.api_veterinaria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.repository.VeterinariaRepository;
import com.api.api_veterinaria.dto.VeterinariaDTO;

@Service
public class VeterinariaService {

    @Autowired
    private VeterinariaRepository veterinariaRepository;

    public List<Veterinaria> obtenerTodos() {
        return veterinariaRepository.findAll();
    }

    public Veterinaria guardar(VeterinariaDTO dto) {
        Veterinaria veterinaria = new Veterinaria();

        veterinaria.setNombreVeterinaria(dto.getNombreVeterinaria());
        veterinaria.setDireccion(dto.getDireccion());
        veterinaria.setTelefono(dto.getTelefono());
        veterinaria.setCorreo(dto.getCorreo());
        veterinaria.setDominio(dto.getCorreo());

        return veterinariaRepository.save(veterinaria);
    }
}