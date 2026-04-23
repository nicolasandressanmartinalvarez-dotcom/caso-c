package com.sanosysalvos.mascotas_service.Repository;

import com.sanosysalvos.mascotas_service.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {
}