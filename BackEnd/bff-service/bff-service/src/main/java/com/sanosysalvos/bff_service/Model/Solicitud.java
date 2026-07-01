package com.sanosysalvos.bff_service.Model;

import java.time.LocalDateTime;

public class Solicitud {

    private Long id;
    private String codigoSolicitud;
    private String tipoSolicitud;
    private String mensaje;
    private String tipoEmisor;
    private String correoEmisor;
    private String correoGestor;
    private String estadoSolicitud;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaResolucion;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoSolicitud() {
        return codigoSolicitud;
    }

    public void setCodigoSolicitud(String codigoSolicitud) {
        this.codigoSolicitud = codigoSolicitud;
    }

    public String getTipoSolicitud() {
        return tipoSolicitud;
    }

    public void setTipoSolicitud(String tipoSolicitud) {
        this.tipoSolicitud = tipoSolicitud;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getTipoEmisor() {
        return tipoEmisor;
    }

    public void setTipoEmisor(String tipoEmisor) {
        this.tipoEmisor = tipoEmisor;
    }

    public String getCorreoEmisor() {
        return correoEmisor;
    }

    public void setCorreoEmisor(String correoEmisor) {
        this.correoEmisor = correoEmisor;
    }

    public String getCorreoGestor() {
        return correoGestor;
    }

    public void setCorreoGestor(String correoGestor) {
        this.correoGestor = correoGestor;
    }

    public String getEstadoSolicitud() {
        return estadoSolicitud;
    }

    public void setEstadoSolicitud(String estadoSolicitud) {
        this.estadoSolicitud = estadoSolicitud;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaResolucion() {
        return fechaResolucion;
    }

    public void setFechaResolucion(LocalDateTime fechaResolucion) {
        this.fechaResolucion = fechaResolucion;
    }
}
