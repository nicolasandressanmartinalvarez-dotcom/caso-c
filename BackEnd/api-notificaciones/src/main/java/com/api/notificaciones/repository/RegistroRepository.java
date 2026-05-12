package com.api.notificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.notificaciones.model.Registro;

public interface RegistroRepository extends JpaRepository<Registro,Long>{
    
}
