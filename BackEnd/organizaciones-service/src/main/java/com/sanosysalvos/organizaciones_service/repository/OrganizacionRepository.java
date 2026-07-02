package com.sanosysalvos.organizaciones_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sanosysalvos.organizaciones_service.model.Organizacion;

@Repository
public interface OrganizacionRepository extends JpaRepository<Organizacion, Long> {
}
