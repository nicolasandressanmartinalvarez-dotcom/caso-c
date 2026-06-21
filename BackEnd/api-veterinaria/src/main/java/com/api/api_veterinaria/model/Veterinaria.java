package com.api.api_veterinaria.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "veterinarias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veterinaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreVeterinaria;
    private String direccion;
    private String telefono;
    private String correo;
}