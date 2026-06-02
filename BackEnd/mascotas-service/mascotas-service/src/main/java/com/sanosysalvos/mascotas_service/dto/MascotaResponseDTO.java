package com.sanosysalvos.mascotas_service.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MascotaResponseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String tipoDeRaza;
    private String direccion;
    private String correoReportante;
    private String imagen;
    private Double latitud;
    private Double longitud;
}