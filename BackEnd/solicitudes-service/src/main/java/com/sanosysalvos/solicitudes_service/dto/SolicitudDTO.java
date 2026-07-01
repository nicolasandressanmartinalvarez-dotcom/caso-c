package com.sanosysalvos.solicitudes_service.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudDTO {

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
