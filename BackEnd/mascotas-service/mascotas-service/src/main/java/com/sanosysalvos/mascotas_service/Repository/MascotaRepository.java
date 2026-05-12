package com.sanosysalvos.mascotas_service.repository;

import com.sanosysalvos.mascotas_service.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
}
