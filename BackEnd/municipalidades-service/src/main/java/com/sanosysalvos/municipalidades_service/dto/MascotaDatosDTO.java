package com.sanosysalvos.municipalidades_service.dto;

public class MascotaDatosDTO {
    private TipoMascota tipoMascota;
    private TipoRaza tipoRaza;
    private String nombre;
    private String descripcion;
    private String correoReportante;
    private Double latitud;
    private Double longitud;
    private String estado;
    private String color;
    private String tamanio;
    private String genero;
    private String imagen;
    private String entidadReportante;

    public static class TipoRaza {
        private Long idTipoRaza;

        public Long getIdTipoRaza() {
            return idTipoRaza;
        }

        public void setIdTipoRaza(Long idTipoRaza) {
            this.idTipoRaza = idTipoRaza;
        }
    }

    public static class MunicipalidadDto {
        private Long id;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }
    }

    private MunicipalidadDto municipalidad;

    public MunicipalidadDto getMunicipalidad() {
        return municipalidad;
    }

    public void setMunicipalidad(MunicipalidadDto municipalidad) {
        this.municipalidad = municipalidad;
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

    public String getColor() {
        return color;
    }

    public String getTamanio() {
        return tamanio;
    }

    public String getGenero() {
        return genero;
    }

    public String getImagen() {
        return imagen;
    }

    public String getEntidadReportante() {
        return entidadReportante;
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

    public void setColor(String color) {
        this.color = color;
    }

    public void setTamanio(String tamanio) {
        this.tamanio = tamanio;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public void setEntidadReportante(String entidadReportante) {
        this.entidadReportante = entidadReportante;
    }
}
