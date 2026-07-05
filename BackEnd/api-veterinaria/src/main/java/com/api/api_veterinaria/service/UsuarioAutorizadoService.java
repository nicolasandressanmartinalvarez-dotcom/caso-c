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
        usuario.setEstadoUser(usuariosDto.getEstadoUsuario());

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

    public UsuariosPermitidos usuarioPoriD(Long id){
        UsuariosPermitidos usuario = usuarioAutorizadoRepository.findById(id).orElse(null);
        return usuario;
    }

    public UsuariosPermitidos actualizarUsuarioPerm(UsuarioDTO usuarioDTO, Long id){
        
        UsuariosPermitidos usuario = usuarioAutorizadoRepository.findById(id).orElseThrow(()-> new RuntimeException("Usuario No encontrado"));

        Long idVet = usuarioDTO.getVeterinaria().getIdVeterinaria();

        Veterinaria vet = null;
        if(idVet != null){
            vet = veterinariaRepository.findById(idVet).orElse(null);
        }
        usuario.setVeterinaria(vet);
        
        usuario.setApellidoMa(usuarioDTO.getApellidoMa());
        usuario.setApellidoPa(usuarioDTO.getApellidoPa());
        usuario.setNombreUser(usuarioDTO.getNombreUser());
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuario());
        usuario.setEstadoUser(usuarioDTO.getEstadoUsuario());
        usuario.setRol(usuarioDTO.getRol());
        
        return usuarioAutorizadoRepository.save(usuario);
    }

    public List<UsuariosPermitidos> listarPorVeterinaria(Long idVeterinaria) {
        return usuarioAutorizadoRepository.findAll()
                .stream()
                .filter(m -> m.getVeterinaria() != null
                        && m.getVeterinaria().getId().equals(idVeterinaria))
                .toList();
    }

    public String borarUsuario(Long id){
        usuarioAutorizadoRepository.deleteById(id);
        return "Usuario eliminado";
    }
}
