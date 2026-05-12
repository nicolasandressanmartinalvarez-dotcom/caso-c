package com.api.notificaciones.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="RegistroMensajes")
public class Registro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String correoRemitente;
    private String correoEmisor;
    private String mensaje;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime fechaDelRegistro;


    //Getters
    public String getCorreoRemitente() {return correoRemitente;}
    public String getCorreoEmisor() {return correoEmisor;}
    public String getMensaje() {return mensaje;}
    public LocalDateTime getFechaDelRegistro() {return fechaDelRegistro;}

    //Setters
    public void setCorreoRemitente(String correoRemitente) {this.correoRemitente = correoRemitente;}
    public void setCorreoEmisor(String correoEmisor) {this.correoEmisor = correoEmisor;}
    public void setMensaje(String mensaje) {this.mensaje = mensaje;}
    public void setFechaDelRegistro(LocalDateTime fechaDelRegistro) {this.fechaDelRegistro = fechaDelRegistro;}
    
}
