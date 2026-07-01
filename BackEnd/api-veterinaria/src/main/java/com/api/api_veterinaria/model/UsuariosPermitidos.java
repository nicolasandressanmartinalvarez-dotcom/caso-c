package com.api.api_veterinaria.model;


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
@Table(name="UsuriosAutorizados")
@NoArgsConstructor
@AllArgsConstructor
public class UsuariosPermitidos {   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String correoUsuario;
    private String rol;
    private String nombreUser;
    private String apellidoPa;
    private String apellidoMa;
    private String estadoUser;
    private String idAuth0;
    
    @ManyToOne
    @JoinColumn(name="Id_Veterinaria")
    private Veterinaria veterinaria;
}
