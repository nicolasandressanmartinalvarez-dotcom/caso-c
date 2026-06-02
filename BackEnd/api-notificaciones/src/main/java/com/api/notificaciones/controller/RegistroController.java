package com.api.notificaciones.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.api.notificaciones.model.Registro;
import com.api.notificaciones.services.RegistroService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/registro/v1")
public class RegistroController {
    
    @Autowired
    private RegistroService registroService;
    

    @GetMapping
    public List<Registro> todosLosRegistros() {
        return registroService.llamarTodos();
    }
    
    @PostMapping
    public Registro guardarMensage(@RequestBody Registro registro) {
        return registroService.agregaRegistro(registro);
    }
}
