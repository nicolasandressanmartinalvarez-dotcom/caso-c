package com.api.api_veterinaria.dto;

public class MascotaDTO {
    private TipoMascota tipoMascota;
    private TipoRaza tipoRaza;
    private String nombre;
    private String descripcion;
    private String correoReportante;
    private Double latitud;
    private Double longitud;
    private String estado;

    public static class TipoRaza {
        private Long idTipoRaza;

        public Long getIdTipoRaza() {
            return idTipoRaza;
        }

        public void setIdTipoRaza(Long idTipoRaza) {
            this.idTipoRaza = idTipoRaza;
        }
    }

    public static class TipoMascota {
        private Long idTipoMascota;

        public Long getIdTipoMascota() {
            return idTipoMascota;
        }

        public void setIdTipoMascota(Long idTipoMascota) {
            this.idTipoMascota = idTipoMascota;
        }
    }

    public TipoMascota getTipoMascota() {
        return tipoMascota;
    }

    public void setTipoMascota(TipoMascota tipoMascota) {
        this.tipoMascota = tipoMascota;
    }

    public TipoRaza getTipoRaza() {
        return tipoRaza;
    }

    public void setTipoRaza(TipoRaza tipoRaza) {
        this.tipoRaza = tipoRaza;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCorreoReportante() {
        return correoReportante;
    }

    public void setCorreoReportante(String correoReportante) {
        this.correoReportante = correoReportante;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}