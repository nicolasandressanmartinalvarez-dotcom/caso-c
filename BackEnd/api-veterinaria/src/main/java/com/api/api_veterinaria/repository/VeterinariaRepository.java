package com.api.api_veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.api_veterinaria.model.Veterinaria;

public interface VeterinariaRepository extends JpaRepository<Veterinaria, Long> {

}