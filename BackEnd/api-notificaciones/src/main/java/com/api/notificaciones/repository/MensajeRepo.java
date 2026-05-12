package com.api.notificaciones.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.notificaciones.model.MensajePrueba;

public interface MensajeRepo extends JpaRepository<MensajePrueba,Long> {
    
}
