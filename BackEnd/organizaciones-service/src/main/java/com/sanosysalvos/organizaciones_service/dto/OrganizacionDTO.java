package com.sanosysalvos.organizaciones_service.dto;

public class OrganizacionDTO {

    private String nombre;
    private String tipoOrganizacion;
    private String rut;
    private String direccion;
    private String telefono;
    private String email;
    private Long municipalidadId;

    public OrganizacionDTO() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipoOrganizacion() {
        return tipoOrganizacion;
    }

    public void setTipoOrganizacion(String tipoOrganizacion) {
        this.tipoOrganizacion = tipoOrganizacion;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getMunicipalidadId() {
        return municipalidadId;
    }

    public void setMunicipalidadId(Long municipalidadId) {
        this.municipalidadId = municipalidadId;
    }
}
