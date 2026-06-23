package com.api.api_veterinaria.controller;

import java.util.List;

import org.apache.hc.core5.http.HttpStatus;
import org.apache.http.protocol.HTTP;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.api_veterinaria.dto.UsuarioDTO;
import com.api.api_veterinaria.model.UsuariosPermitidos;
import com.api.api_veterinaria.service.UsuarioAutorizadoService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/usuPermitidos")
@CrossOrigin("*")
public class UsuariosPermController {
    private UsuarioAutorizadoService usuAutorizadoService;

    public UsuariosPermController(UsuarioAutorizadoService usuAutorizadoService){
        this.usuAutorizadoService = usuAutorizadoService;
    }

    @GetMapping
    public List<UsuariosPermitidos> TodosUsuPerm() {
        return usuAutorizadoService.obtenerUsuarios();
    }
    
    @PostMapping
    public UsuariosPermitidos gUsuariosPermitidos(@RequestBody UsuarioDTO usuarioDTO) {
        
        Long idVeterinaria = (usuarioDTO.getVeterinaria()!=null ? usuarioDTO.getVeterinaria().getIdVeterinaria():null);

        return usuAutorizadoService.guardarUsuario(usuarioDTO, idVeterinaria);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuPerm(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {

        try{
            UsuariosPermitidos usuaruioAct = usuAutorizadoService.actualizarUsuarioPerm(usuarioDTO, id);
            return ResponseEntity.ok(usuaruioAct);
        }
        catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body(e.getMessage());
        }
        
    }
    
}
