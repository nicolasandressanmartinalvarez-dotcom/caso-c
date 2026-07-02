package com.sanosysalvos.municipalidades_service.repository;

import com.sanosysalvos.municipalidades_service.model.Campana;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampanaRepository extends JpaRepository<Campana, Long> {
    List<Campana> findByMunicipalidadId(Long municipalidadId);
}
