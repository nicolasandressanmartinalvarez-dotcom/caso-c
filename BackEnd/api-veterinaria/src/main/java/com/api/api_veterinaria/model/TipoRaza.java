package com.api.api_veterinaria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipos_raza")
public class TipoRaza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoRaza;

    private String nombre;

    public TipoRaza() {
    }

    public Long getIdTipoRaza() {
        return idTipoRaza;
    }

    public void setIdTipoRaza(Long idTipoRaza) {
        this.idTipoRaza = idTipoRaza;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}