package com.sanosysalvos.mascotas_service.dto;

public class MascotaDatosDTO {
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

    // Getters
    public TipoMascota getTipoMascota() {
        return tipoMascota;
    }

    public TipoRaza getTipoRaza() {
        return tipoRaza;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
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

    public String getEstado() {
        return estado;
    }

    // Setters
    public void setTipoMascota(TipoMascota tipoMascota) {
        this.tipoMascota = tipoMascota;
    }

    public void setTipoRaza(TipoRaza tipoRaza) {
        this.tipoRaza = tipoRaza;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
