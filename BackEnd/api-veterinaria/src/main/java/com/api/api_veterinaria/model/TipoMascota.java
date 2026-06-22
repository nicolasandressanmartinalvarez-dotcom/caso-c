package com.api.api_veterinaria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipos_mascota")
public class TipoMascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoMascota;

    private String nombre;

    public TipoMascota() {
    }

    public Long getIdTipoMascota() {
        return idTipoMascota;
    }

    public void setIdTipoMascota(Long idTipoMascota) {
        this.idTipoMascota = idTipoMascota;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}