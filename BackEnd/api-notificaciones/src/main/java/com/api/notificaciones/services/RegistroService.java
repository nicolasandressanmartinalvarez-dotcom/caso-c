package com.api.notificaciones.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.notificaciones.model.Registro;
import com.api.notificaciones.repository.RegistroRepository;

@Service
public class RegistroService {
    @Autowired
    private RegistroRepository registroRepository;

    @Autowired
    private MailService mailService;

    public List<Registro> llamarTodos(){
        return registroRepository.findAll();
    }

    public Registro agregaRegistro(Registro registro){
        registro.setFechaDelRegistro(LocalDateTime.now());
        String mensaje = "Hola {Dueño}, tu mascota fue encontrada, comunicate con este correo : " + registro.getCorreoEmisor();
        String remitente = registro.getCorreoRemitente();
        registro.setMensaje(mensaje);
        registroRepository.save(registro);
        mailService.MandarEmail(remitente, "Mascota encontrada", mensaje);
        return registro;
    }
}
