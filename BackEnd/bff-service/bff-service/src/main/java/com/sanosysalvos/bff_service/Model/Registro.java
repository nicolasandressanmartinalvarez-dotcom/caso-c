package com.sanosysalvos.bff_service.Model;

public class Registro {

    private String correoRemitente;
    private String correoEmisor;
    private String mensaje;
    private String fechaDelRegistro;

    public String getCorreoRemitente() {
        return correoRemitente;
    }

    public void setCorreoRemitente(String correoRemitente) {
        this.correoRemitente = correoRemitente;
    }

    public String getCorreoEmisor() {
        return correoEmisor;
    }

    public void setCorreoEmisor(String correoEmisor) {
        this.correoEmisor = correoEmisor;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getFechaDelRegistro() {
        return fechaDelRegistro;
    }

    public void setFechaDelRegistro(String fechaDelRegistro) {
        this.fechaDelRegistro = fechaDelRegistro;
    }
}