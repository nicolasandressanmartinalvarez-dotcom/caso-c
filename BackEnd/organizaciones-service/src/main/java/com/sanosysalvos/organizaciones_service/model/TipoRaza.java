package com.sanosysalvos.organizaciones_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipos_raza")
public class TipoRaza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoRaza;

    @Column(nullable = false, unique = true)
    private String nombreTipoRaza;

    public TipoRaza() {}

    // Getters y Setters
    public Long getIdTipoRaza() { return idTipoRaza; }
    public void setIdTipoRaza(Long idTipoRaza) { this.idTipoRaza = idTipoRaza; }

    public String getNombreTipoRaza() { return nombreTipoRaza; }
    public void setNombreTipoRaza(String nombreTipoRaza) { this.nombreTipoRaza = nombreTipoRaza; }
}
