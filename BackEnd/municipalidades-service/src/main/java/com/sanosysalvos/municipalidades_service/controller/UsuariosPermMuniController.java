package com.sanosysalvos.municipalidades_service.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sanosysalvos.municipalidades_service.dto.UsuarioMuniDTO;
import com.sanosysalvos.municipalidades_service.model.UsuariosPermitidosMuni;
import com.sanosysalvos.municipalidades_service.service.UsuariosPermitidosMuniService;

@RestController
@RequestMapping("/api/usuPermitidosMuni")
public class UsuariosPermMuniController {

    private final UsuariosPermitidosMuniService usuMuniService;

    public UsuariosPermMuniController(UsuariosPermitidosMuniService usuMuniService) {
        this.usuMuniService = usuMuniService;
    }

    @GetMapping
    public List<UsuariosPermitidosMuni> todosUsuPerm() {
        return usuMuniService.obtenerUsuarios();
    }

    @PostMapping
    public UsuariosPermitidosMuni guardarUsuariosPermitidos(@RequestBody UsuarioMuniDTO usuarioDTO) {
        Long idMuni = (usuarioDTO.getMunicipalidad() != null ? usuarioDTO.getMunicipalidad().getIdMunicipalidad()
                : null);
        return usuMuniService.guardarUsuario(usuarioDTO, idMuni);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuPerm(@PathVariable Long id, @RequestBody UsuarioMuniDTO usuarioDTO) {
        try {
            UsuariosPermitidosMuni usuarioAct = usuMuniService.actualizarUsuarioPerm(usuarioDTO, id);
            return ResponseEntity.ok(usuarioAct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
