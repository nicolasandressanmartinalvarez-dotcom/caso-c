package com.sanosysalvos.organizaciones_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanosysalvos.organizaciones_service.dto.UsuarioOrgDTO;
import com.sanosysalvos.organizaciones_service.model.UsuariosPermitidosOrg;
import com.sanosysalvos.organizaciones_service.model.Organizacion;
import com.sanosysalvos.organizaciones_service.repository.UsuariosPermitidosOrgRepository;
import com.sanosysalvos.organizaciones_service.repository.OrganizacionRepository;

@Service
public class UsuariosPermitidosOrgService {

    @Autowired
    private UsuariosPermitidosOrgRepository usuariosOrgRepository;

    @Autowired
    private OrganizacionRepository organizacionRepository;

    public List<UsuariosPermitidosOrg> obtenerUsuarios() {
        return usuariosOrgRepository.findAll();
    }

    public UsuariosPermitidosOrg guardarUsuario(UsuarioOrgDTO usuarioDTO, Long idOrganizacion) {
        UsuariosPermitidosOrg usuario = new UsuariosPermitidosOrg();

        usuario.setIdAuth0(usuarioDTO.getIdAuth0());
        usuario.setRol(usuarioDTO.getRol());
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuario());
        usuario.setNombreUser(usuarioDTO.getNombreUser());
        usuario.setApellidoPa(usuarioDTO.getApellidoPa());
        usuario.setApellidoMa(usuarioDTO.getApellidoMa());
        usuario.setEstadoUser(usuarioDTO.getEstadoUsuario());

        Organizacion org = null;
        if (idOrganizacion != null) {
            org = organizacionRepository.findById(idOrganizacion).orElse(null);
        }

        usuario.setOrganizacion(org);
        return usuariosOrgRepository.save(usuario);
    }

    public UsuariosPermitidosOrg actualizarUsuarioPerm(UsuarioOrgDTO usuarioDTO, Long id) {
        UsuariosPermitidosOrg usuario = usuariosOrgRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario No encontrado"));

        Long idOrg = usuarioDTO.getOrganizacion().getIdOrganizacion();
        Organizacion org = null;

        if (idOrg != null) {
            org = organizacionRepository.findById(idOrg).orElse(null);
        }

        usuario.setOrganizacion(org);
        usuario.setCorreoUsuario(usuarioDTO.getCorreoUsuario());
        usuario.setRol(usuarioDTO.getRol());
        usuario.setNombreUser(usuarioDTO.getNombreUser());
        usuario.setApellidoPa(usuarioDTO.getApellidoPa());
        usuario.setApellidoMa(usuarioDTO.getApellidoMa());
        usuario.setEstadoUser(usuarioDTO.getEstadoUsuario());

        return usuariosOrgRepository.save(usuario);
    }
}
