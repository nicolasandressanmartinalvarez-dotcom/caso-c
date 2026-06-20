package com.api.api_veterinaria.dto;

import lombok.Data;

@Data
public class MascotaDTO {

    private String nombre;
    private String descripcion;

    private Long idTipoRaza;
    private Long idTipoMascota;

    private String correoReportante;
    private String imagen;

    private String color;
    private String tamanio;
    private String entidadReportante;

    private Double latitud;
    private Double longitud;
}