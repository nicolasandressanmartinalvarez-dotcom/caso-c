package com.sanosysalvos.organizaciones_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sanosysalvos.organizaciones_service.dto.UsuarioOrgDTO;
import com.sanosysalvos.organizaciones_service.model.UsuariosPermitidosOrg;
import com.sanosysalvos.organizaciones_service.service.UsuariosPermitidosOrgService;

@RestController
@RequestMapping("/api/usuPermitidosOrg")
@CrossOrigin("*")
public class UsuariosPermOrgController {

    private final UsuariosPermitidosOrgService usuOrgService;

    public UsuariosPermOrgController(UsuariosPermitidosOrgService usuOrgService) {
        this.usuOrgService = usuOrgService;
    }

    @GetMapping
    public List<UsuariosPermitidosOrg> todosUsuPerm() {
        return usuOrgService.obtenerUsuarios();
    }

    @PostMapping
    public UsuariosPermitidosOrg guardarUsuariosPermitidos(@RequestBody UsuarioOrgDTO usuarioDTO) {
        Long idOrg = (usuarioDTO.getOrganizacion() != null ? usuarioDTO.getOrganizacion().getIdOrganizacion() : null);
        return usuOrgService.guardarUsuario(usuarioDTO, idOrg);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuPerm(@PathVariable Long id, @RequestBody UsuarioOrgDTO usuarioDTO) {
        try {
            UsuariosPermitidosOrg usuarioAct = usuOrgService.actualizarUsuarioPerm(usuarioDTO, id);
            return ResponseEntity.ok(usuarioAct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
