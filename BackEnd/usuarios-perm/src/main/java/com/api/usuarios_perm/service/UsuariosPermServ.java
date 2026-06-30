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


    public Usuarios actualizUsuarios(String correo, Usuarios usuario) {
    
        Usuarios usuarioEncontrado = usuarioRepo.findByCorreoUsuario(correo);

        if (usuarioEncontrado == null) {
            return null;
        }
        if (usuario.getCorreoUsuario() != null && !usuario.getCorreoUsuario().isEmpty()) {
            usuarioEncontrado.setCorreoUsuario(usuario.getCorreoUsuario());
        }
        
        if (usuario.getEntidadPerteneciente() != null && !usuario.getEntidadPerteneciente().isEmpty()) {
            usuarioEncontrado.setEntidadPerteneciente(usuario.getEntidadPerteneciente());
        }
        
        if (usuario.getIdAuth0() != null && !usuario.getIdAuth0().isEmpty()) {
            usuarioEncontrado.setIdAuth0(usuario.getIdAuth0());
        }
        return usuarioRepo.save(usuarioEncontrado);
    }

    public String borrarUsuario(Long id){
        
        usuarioRepo.deleteById(id);
        return "Usuario Eliminado";
    }
}
