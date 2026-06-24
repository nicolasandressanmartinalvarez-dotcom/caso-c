package com.api.usuarios_perm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.usuarios_perm.model.Usuarios;
import com.api.usuarios_perm.repository.UsuarioRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuariosPermServ {
    
    private final UsuarioRepo usuarioRepo;

    public List<Usuarios> todosLosUsuarios(){
        return usuarioRepo.findAll();
    }

    public Usuarios ingresarUsuario(Usuarios usuario){
        return usuarioRepo.save(usuario);
    }

    public Usuarios buscarPorCorreo(String correoUsuario){
        return usuarioRepo.findByCorreoUsuario(correoUsuario);
    }

    public Usuarios actualizUsuarios(String correo, Usuarios usuario){
        
        Usuarios usuarioEncontrado = usuarioRepo.findByCorreoUsuario(correo);

        usuarioEncontrado.setCorreoUsuario(usuario.getCorreoUsuario());
        usuarioEncontrado.setIdAuth0(usuario.getIdAuth0());
        usuarioEncontrado.setEntidadPerteneciente(usuario.getEntidadPerteneciente());
        return usuarioRepo.save(usuarioEncontrado);
    }

}
