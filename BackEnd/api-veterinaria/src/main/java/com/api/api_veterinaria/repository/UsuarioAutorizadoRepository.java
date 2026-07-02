package com.api.api_veterinaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.api_veterinaria.model.UsuariosPermitidos;

public interface UsuarioAutorizadoRepository extends JpaRepository<UsuariosPermitidos,Long> {

} 
