package com.sanosysalvos.mascotas_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mascotas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "tipo_raza_id")
    private TipoRaza tipoDeRaza;

    @ManyToOne
    @JoinColumn(name = "tipo_mascota_id")
    private TipoMascota tipoMascota;

    private String estado;
    private String correoReportante;
    private String imagen;
    private String genero;
    private String color;
    private String tamanio;
    private String entidadReportante;
    private Double latitud;
    private Double longitud;

}