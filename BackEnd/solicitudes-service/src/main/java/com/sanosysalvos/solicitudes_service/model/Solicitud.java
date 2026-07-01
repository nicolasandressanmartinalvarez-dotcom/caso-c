package com.sanosysalvos.solicitudes_service.model;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "solicitudes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoSolicitud;
    private String tipoSolicitud;
    private String mensaje;
    private String tipoEmisor;
    private String correoEmisor;
    private String correoGestor;
    private String estadoSolicitud;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaResolucion;
}
