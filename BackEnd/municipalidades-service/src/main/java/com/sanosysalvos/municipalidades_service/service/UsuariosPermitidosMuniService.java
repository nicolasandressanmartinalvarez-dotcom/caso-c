package com.sanosysalvos.municipalidades_service.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanosysalvos.municipalidades_service.dto.UsuarioMuniDTO;
import com.sanosysalvos.municipalidades_service.model.UsuariosPermitidosMuni;
import com.sanosysalvos.municipalidades_service.model.Municipalidad;
import com.sanosysalvos.municipalidades_service.repository.UsuariosPermitidosMuniRepository;
import com.sanosysalvos.municipalidades_service.repository.MunicipalidadRepository; // Asegúrate de tener este repositorio

@Service
public class UsuariosPermitidosMuniService {

    @Autowired
    private UsuariosPermitidosMuniRepository usuariosMuniRepository;

    @Autowired
    private MunicipalidadRepository municipalidadRepository;

    public List<UsuariosPermitidosMuni> obtenerUsuarios() {
        return usuariosMuniRepository.findAll();
    }

    public UsuariosPermitidosMuni guardarUsuario(UsuarioMuniDTO usuarioDTO, Long idMunicipalidad) {
        UsuariosPermitidosMuni usuario = new UsuariosPermitidosMuni();

        usuario.setIdAuth0(usuarioDTO.getIdAuth0());
        usuario.setRol(usuarioDTO.getRol());
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuario());
        usuario.setNombreUser(usuarioDTO.getNombreUser());
        usuario.setApellidoPa(usuarioDTO.getApellidoPa());
        usuario.setApellidoMa(usuarioDTO.getApellidoMa());
        usuario.setEstadoUser(usuarioDTO.getEstadoUsuario());

        Municipalidad muni = null;
        if (idMunicipalidad != null) {
            muni = municipalidadRepository.findById(idMunicipalidad).orElse(null);
        }

        usuario.setMunicipalidad(muni);
        return usuariosMuniRepository.save(usuario);
    }

    public UsuariosPermitidosMuni actualizarUsuarioPerm(UsuarioMuniDTO usuarioDTO, Long id) {
        UsuariosPermitidosMuni usuario = usuariosMuniRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario No encontrado"));

        Long idMuni = usuarioDTO.getMunicipalidad().getIdMunicipalidad();
        Municipalidad muni = null;

        if (idMuni != null) {
            muni = municipalidadRepository.findById(idMuni).orElse(null);
        }

        usuario.setMunicipalidad(muni);
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuario());
        usuario.setRol(usuarioDTO.getRol());
        usuario.setNombreUser(usuarioDTO.getNombreUser());
        usuario.setApellidoPa(usuarioDTO.getApellidoPa());
        usuario.setApellidoMa(usuarioDTO.getApellidoMa());
        usuario.setEstadoUser(usuarioDTO.getEstadoUsuario());

        return usuariosMuniRepository.save(usuario);
    }
}
