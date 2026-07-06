package com.sanosysalvos.organizaciones_service.repository;

import com.sanosysalvos.organizaciones_service.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {

    List<Mascota> findByOrganizacionId(Long organizacionId);

}
