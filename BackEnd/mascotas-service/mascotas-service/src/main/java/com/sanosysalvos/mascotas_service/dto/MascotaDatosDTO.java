package com.sanosysalvos.mascotas_service.dto;

public class MascotaDatosDTO {

    private TipoRaza tipoRaza;
    private String nombre;
    private String descripcion;
    private String direccion;
    private String correoReportante;
    private Double latitud;
    private Double longitud;

    public static class TipoRaza {
        private Long idTipoRaza;

        public Long getIdTipoRaza() {
            return idTipoRaza;
        }

        public void setIdTipoRaza(Long idTipoRaza) {
            this.idTipoRaza = idTipoRaza;
        }
    }

    // Getters
    public TipoRaza getTipoRaza() {
        return tipoRaza;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getCorreoReportante() {
        return correoReportante;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    // Setters
    public void setTipoRaza(TipoRaza tipoRaza) {
        this.tipoRaza = tipoRaza;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setCorreoReportante(String correoReportante) {
        this.correoReportante = correoReportante;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }
}