package com.api.usuarios_perm.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.usuarios_perm.model.Usuarios;
import com.api.usuarios_perm.service.UsuariosPermServ;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/usuarios")
@AllArgsConstructor
public class UsuariosContr {

    private final UsuariosPermServ usuariosPermServ;

    @GetMapping
    public List<Usuarios> allUsuarios() {
        return usuariosPermServ.todosLosUsuarios();
    }
    @PostMapping
    public Usuarios guardUsuarios(@RequestBody Usuarios usuarios) {
        return usuariosPermServ.ingresarUsuario(usuarios);
    }

    @GetMapping("/{correo}")
    public Usuarios buscarPorCorreo(@PathVariable String correo) {
        return usuariosPermServ.buscarPorCorreo(correo);
    }
    
    @PutMapping("/{correo}")
    public Usuarios actualizarUser(@PathVariable String correo, @RequestBody Usuarios usuario) {
        
        return usuariosPermServ.actualizUsuarios(correo, usuario);
    }
    
    
}
