package com.sanosysalvos.mascotas_service.Repository;

import com.sanosysalvos.mascotas_service.model.TipoRaza;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoRazaRepository extends JpaRepository<TipoRaza, Long> {
}