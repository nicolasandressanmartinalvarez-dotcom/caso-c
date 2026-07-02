package com.api.notificaciones;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.api.notificaciones.model.Registro;
import com.api.notificaciones.repository.RegistroRepository;
import com.api.notificaciones.services.MailService;
import com.api.notificaciones.services.RegistroService;

@ExtendWith(MockitoExtension.class)
public class RegistroServiceTest {

    @Mock
    private RegistroRepository registroRepository;

    @Mock
    private MailService mailService;

    @InjectMocks
    private RegistroService registroService;

    private Registro registroPrueba;

    @BeforeEach
    void setUp() {
        registroPrueba = new Registro();
        registroPrueba.setCorreoRemitente("dueno@gmail.com");
        registroPrueba.setCorreoEmisor("heroe_que_encontro_mascota@gmail.com");
    }

    @Test
    void llamarTodos_DebeRetornarListaDeRegistros() {
        when(registroRepository.findAll()).thenReturn(Arrays.asList(registroPrueba));
        
        List<Registro> resultado = registroService.llamarTodos();
        
        assertFalse(resultado.isEmpty());
        assertEquals(1, resultado.size());
        verify(registroRepository, times(1)).findAll();
    }

    @Test
    void agregaRegistro_DebeAsignarFechaActual() {
        Registro resultado = registroService.agregaRegistro(registroPrueba);
        assertNotNull(resultado.getFechaDelRegistro());
    }

    @Test
    void agregaRegistro_DebeGenerarMensajeCorrecto() {
        Registro resultado = registroService.agregaRegistro(registroPrueba);
        String mensajeEsperado = "Hola {Dueño}, tu mascota fue encontrada, comunicate con este correo : heroe_que_encontro_mascota@gmail.com";
        assertEquals(mensajeEsperado, resultado.getMensaje());
    }

    @Test
    void agregaRegistro_DebeGuardarEnRepositorio() {
        registroService.agregaRegistro(registroPrueba);
        verify(registroRepository, times(1)).save(registroPrueba);
    }

    @Test
    void agregaRegistro_DebeLlamarAlServicioDeMails() {
        registroService.agregaRegistro(registroPrueba);
        String mensajeEsperado = "Hola {Dueño}, tu mascota fue encontrada, comunicate con este correo : heroe_que_encontro_mascota@gmail.com";
        
        verify(mailService, times(1)).MandarEmail(
            eq("dueno@gmail.com"), 
            eq("Mascota encontrada"), 
            eq(mensajeEsperado)
        );
    }
}