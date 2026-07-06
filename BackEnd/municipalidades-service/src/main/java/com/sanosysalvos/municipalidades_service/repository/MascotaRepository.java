package com.sanosysalvos.municipalidades_service.repository;

import com.sanosysalvos.municipalidades_service.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    List<Mascota> findByMunicipalidadId(Long municipalidadId);
}
