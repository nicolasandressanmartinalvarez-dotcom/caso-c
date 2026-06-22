package com.api.api_veterinaria.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.api_veterinaria.dto.UsuarioDTO;
import com.api.api_veterinaria.model.UsuariosPermitidos;
import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.repository.UsuarioAutorizadoRepository;
import com.api.api_veterinaria.repository.VeterinariaRepository;

@Service
public class UsuarioAutorizadoService {
    
    private final UsuarioAutorizadoRepository usuarioAutorizadoRepository;
    private final VeterinariaRepository veterinariaRepository;

    UsuarioAutorizadoService(UsuarioAutorizadoRepository usuarioAutorizadoRepository,VeterinariaRepository veterinariaRepositor) {
        this.usuarioAutorizadoRepository = usuarioAutorizadoRepository;
        this.veterinariaRepository = veterinariaRepositor;
    }

    public List<UsuariosPermitidos> obtenerUsuarios(){
        return usuarioAutorizadoRepository.findAll();
    }
    
    public UsuariosPermitidos guardarUsuario(UsuarioDTO usuariosDto, Long idVeterinaria){

        UsuariosPermitidos usuario = new UsuariosPermitidos();
        usuario.setIdAuth0(usuariosDto.getIdAuth0());
        usuario.setRol(usuariosDto.getRol());
        usuario.setCorreoUsuario(usuariosDto.getCorreoUsuario());
        usuario.setNombreUser(usuariosDto.getNombreUser());
        usuario.setApellidoPa(usuariosDto.getApellidoPa());
        usuario.setApellidoMa(usuariosDto.getApellidoMa());

        Veterinaria veterinaria = null;
        if(idVeterinaria != null){
            veterinaria = veterinariaRepository.findById(idVeterinaria).orElse(null);
        }

        if(veterinaria != null){
            usuario.setVeterinaria(veterinaria);
            System.err.println("Veterianria encontrada");
        }
        
        usuario.setVeterinaria(veterinaria);
        
        return usuarioAutorizadoRepository.save(usuario);
    }
}
