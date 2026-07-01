package com.api.usuarios_perm.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.api.usuarios_perm.model.Usuarios;

public interface UsuarioRepo extends JpaRepository<Usuarios, Long> {
    Usuarios findByCorreoUsuario(String correoUsuario);
}
