package com.sanosysalvos.organizaciones_service.model;

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
@Data
@Table(name = "UsuariosAutorizadosOrg")
@NoArgsConstructor
@AllArgsConstructor
public class UsuariosPermitidosOrg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreUser;
    private String apellidoPa;
    private String apellidoMa;
    private String estadoUser;
    private String correoUsuario;
    private String idAuth0;
    private String rol;

    @ManyToOne
    @JoinColumn(name = "Id_Organizacion")
    private Organizacion organizacion;
}
