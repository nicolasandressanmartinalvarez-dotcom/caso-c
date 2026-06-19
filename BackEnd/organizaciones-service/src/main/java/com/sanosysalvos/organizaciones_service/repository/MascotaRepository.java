package com.sanosysalvos.organizaciones_service.repository;

import com.sanosysalvos.organizaciones_service.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
}
