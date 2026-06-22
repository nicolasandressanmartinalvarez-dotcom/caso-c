package com.sanosysalvos.bff_service.model_Mascota;

public class TipoMascota {

    private Long idTipoMascota;

    private String nombre;

    public TipoMascota() {
    }

    // Getters y Setters
    public Long getId() {
        return idTipoMascota;
    }

    public void setId(Long id) {
        this.idTipoMascota = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
