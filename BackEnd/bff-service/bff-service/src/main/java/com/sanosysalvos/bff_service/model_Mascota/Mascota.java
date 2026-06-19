package com.sanosysalvos.bff_service.model_Mascota;


public class Mascota {

    private Long id;
    private String nombre;
    private String descripcion;

    private TipoRaza tipoDeRaza;

    private TipoMascota tipoMascota;


    private String correoReportante;
    private String imagen;

    private String color;
    private String tamanio;
    private String entidadReportante;
    
    private Double latitud;
    private Double longitud;

    public Mascota() {
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public TipoRaza getTipoDeRaza() {
        return tipoDeRaza;
    }

    public void setTipoDeRaza(TipoRaza tipoDeRaza) {
        this.tipoDeRaza = tipoDeRaza;
    }

    public String getCorreoReportante() {
        return correoReportante;
    }

    public void setCorreoReportante(String correoReportante) {
        this.correoReportante = correoReportante;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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

    public TipoMascota getTipoMascota() {
        return tipoMascota;
    }

    public void setTipoMascota(TipoMascota tipoMascota) {
        this.tipoMascota = tipoMascota;
    }
}
