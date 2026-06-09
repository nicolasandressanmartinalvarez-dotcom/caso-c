package com.sanosysalvos.mascotas_service.Repository;

import com.sanosysalvos.mascotas_service.model.TipoRaza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TipoRazaRepository extends JpaRepository<TipoRaza, Long> {
}