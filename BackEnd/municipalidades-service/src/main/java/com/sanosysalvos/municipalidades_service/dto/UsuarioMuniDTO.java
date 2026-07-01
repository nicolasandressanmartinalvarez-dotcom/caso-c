package com.sanosysalvos.municipalidades_service.dto;

public class UsuarioMuniDTO {
    private String correoUsuario;
    private String rol;
    private String idAuth0;
    private String nombreUser;
    private String apellidoPa;
    private String apellidoMa;
    private String estadoUsuario;
    private MunicipalidadDto municipalidad;

    public static class MunicipalidadDto {
        private Long idMunicipalidad;

        public Long getIdMunicipalidad() {
            return idMunicipalidad;
        }

        public void setIdMunicipalidad(Long idMunicipalidad) {
            this.idMunicipalidad = idMunicipalidad;
        }
    }

    // Getters
    public String getCorreoUsuario() {
        return correoUsuario;
    }

    public String getRol() {
        return rol;
    }

    public String getIdAuth0() {
        return idAuth0;
    }

    public String getNombreUser() {
        return nombreUser;
    }

    public String getApellidoPa() {
        return apellidoPa;
    }

    public String getApellidoMa() {
        return apellidoMa;
    }

    public String getEstadoUsuario() {
        return estadoUsuario;
    }

    public MunicipalidadDto getMunicipalidad() {
        return municipalidad;
    }

    // Setters
    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public void setIdAuth0(String idAuth0) {
        this.idAuth0 = idAuth0;
    }

    public void setNombreUser(String nombreUser) {
        this.nombreUser = nombreUser;
    }

    public void setApellidoPa(String apellidoPa) {
        this.apellidoPa = apellidoPa;
    }

    public void setApellidoMa(String apellidoMa) {
        this.apellidoMa = apellidoMa;
    }

    public void setEstadoUsuario(String estadoUsuario) {
        this.estadoUsuario = estadoUsuario;
    }

    public void setMunicipalidad(MunicipalidadDto municipalidad) {
        this.municipalidad = municipalidad;
    }
}