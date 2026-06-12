package com.sanosysalvos.municipalidades_service.repository;

import com.sanosysalvos.municipalidades_service.model.Municipalidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MunicipalidadRepository extends JpaRepository<Municipalidad, Long> {
}
