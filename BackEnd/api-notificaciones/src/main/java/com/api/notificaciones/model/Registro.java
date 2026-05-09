package com.api.notificaciones.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Registro-mensajes")
public class Registro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String correoRemitente;
    private String correoEmisor;
    private String mensaje;
}
