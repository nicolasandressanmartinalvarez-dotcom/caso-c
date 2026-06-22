package com.api.api_veterinaria.dto;

import lombok.Data;

@Data
public class VeterinariaDTO {

    private String nombreVeterinaria;
    private String direccion;
    private String telefono;
    private String correo;

    private String nombreMascota;
    private String especie;
    private String raza;
    private String descripcion;
    private String estado;
}