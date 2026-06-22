package com.api.api_veterinaria.dto;

public class UsuarioDTO {
    private String correoUsuario;
    private String rol;
    private String idAuth0;
    private String nombreUser;
    private String apellidoPa;
    private String apellidoMa;
    private Veterinaria Veterinaria;

    public static class Veterinaria {
        private Long idVeterinaria;

        public Long getIdVeterinaria(){
            return idVeterinaria;
        }
        public void setIdVeterinaria(Long idVeterinaria){
            this.idVeterinaria = idVeterinaria;
        }
    }

    //Getters
    public Veterinaria getVeterinaria() {return Veterinaria;}
    public String getNombreUser() {return nombreUser;}
    public String getApellidoPa() {return apellidoPa;}
    public String getApellidoMa() {return apellidoMa;}
    public String getCorreoUsuario() {return correoUsuario;}
    public String getRol() {return rol;}
    public String getIdAuth0() {return idAuth0;}
    //Setters
    public void setVeterinaria(Veterinaria veterinaria) {Veterinaria = veterinaria;}
    public void setNombreUser(String nombreUser) {this.nombreUser = nombreUser;}
    public void setApellidoPa(String apellidoPa) {this.apellidoPa = apellidoPa;    }
    public void setApellidoMa(String apellidoMa) {this.apellidoMa = apellidoMa;}
    public void setCorreoUsuario(String correoUsuario) {this.correoUsuario = correoUsuario;}
    public void setRol(String rol) {this.rol = rol;}
    public void setIdAuth0(String idAuth0) {this.idAuth0 = idAuth0;}
}
