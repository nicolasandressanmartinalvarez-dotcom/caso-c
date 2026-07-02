package com.sanosysalvos.solicitudes_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sanosysalvos.solicitudes_service.model.Solicitud;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
}
