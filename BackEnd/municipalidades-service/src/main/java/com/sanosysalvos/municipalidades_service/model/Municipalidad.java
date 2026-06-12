package com.sanosysalvos.municipalidades_service.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Table(name = "municipalidades")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Municipalidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String comuna;
    private String region;
    private String correoInstitucional;
    private String telefono;
    private Double latitud;
    private Double longitud;

    @ElementCollection
    @CollectionTable(name = "municipalidad_mascotas", joinColumns = @JoinColumn(name = "municipalidad_id"))
    @Column(name = "mascota_id")
    private List<Long> mascotasIds;
}
