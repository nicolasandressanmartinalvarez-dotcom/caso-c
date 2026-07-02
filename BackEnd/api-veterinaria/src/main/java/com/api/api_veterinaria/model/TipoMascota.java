package com.api.api_veterinaria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipos_mascota")
public class TipoMascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoMascota;

    @Column(nullable = false, unique = true)
    private String nombreTipoMascota;

    public TipoMascota() {
    }

    // Getters y Setters
    public Long getIdTipoMascota() {
        return idTipoMascota;
    }

    public void setIdTipoMascota(Long idTipoMascota) {
        this.idTipoMascota = idTipoMascota;
    }

    public String getNombreTipoMascota() {
        return nombreTipoMascota;
    }

    public void setNombreTipoMascota(String nombreTipoMascota) {
        this.nombreTipoMascota = nombreTipoMascota;
    }
}
