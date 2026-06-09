package com.sanosysalvos.mascotas_service.repository;

import com.sanosysalvos.mascotas_service.model.TipoMascota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoMascotaRepository extends JpaRepository<TipoMascota, Long> {
}
