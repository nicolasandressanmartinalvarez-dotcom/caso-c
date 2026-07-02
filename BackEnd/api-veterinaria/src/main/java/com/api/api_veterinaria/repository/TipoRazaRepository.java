package com.api.api_veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.api_veterinaria.model.TipoRaza;

public interface TipoRazaRepository extends JpaRepository<TipoRaza, Long> {
    
}
