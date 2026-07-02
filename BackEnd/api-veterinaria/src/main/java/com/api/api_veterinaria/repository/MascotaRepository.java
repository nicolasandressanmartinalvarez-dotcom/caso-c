package com.api.api_veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.api_veterinaria.model.Mascota;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    
}
