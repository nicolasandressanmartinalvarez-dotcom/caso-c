package com.sanosysalvos.municipalidades_service.repository;

import com.sanosysalvos.municipalidades_service.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
}
