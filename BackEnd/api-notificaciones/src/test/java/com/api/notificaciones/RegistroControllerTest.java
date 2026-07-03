package com.api.notificaciones;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.api.notificaciones.controller.RegistroController;
import com.api.notificaciones.model.Registro;
import com.api.notificaciones.services.RegistroService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// @WebMvcTest levanta solo el contexto web (Controladores) sin toda la base de datos
@WebMvcTest(RegistroController.class)
@AutoConfigureMockMvc(addFilters = false) 
public class RegistroControllerTest {

    @Autowired
    private MockMvc mockMvc; // Herramienta clave para simular peticiones HTTP (GET, POST, etc.)

    @MockBean
    private RegistroService registroService; // Mockeamos el servicio para no ejecutar la lógica real

    @Autowired
    private ObjectMapper objectMapper; // Para convertir objetos Java a JSON

    private Registro registroPrueba;

    @BeforeEach
    void setUp() {
        registroPrueba = new Registro();
        registroPrueba.setCorreoRemitente("dueno@gmail.com");
        registroPrueba.setCorreoEmisor("heroe_que_encontro_mascota@gmail.com");
        registroPrueba.setMensaje("Hola {Dueño}, tu mascota fue encontrada...");
    }

    // PRUEBA 1: Simular un GET y verificar que responda con éxito y traiga los datos
    @Test
    void todosLosRegistros_DebeRetornarStatus200YLista() throws Exception {
        // Le decimos al mock qué devolver cuando lo llamen
        when(registroService.llamarTodos()).thenReturn(Arrays.asList(registroPrueba));

        // Ejecutamos la petición GET y verificamos el resultado
        mockMvc.perform(get("/api/registro/v1"))
                .andExpect(status().isOk()) // Verifica que el código HTTP sea 200
                .andExpect(jsonPath("$[0].correoRemitente").value("dueno@gmail.com")); // Verifica el JSON de respuesta
    }

    // PRUEBA 2: Simular un POST enviando un JSON y verificar que se guarde
    @Test
    void guardarMensage_DebeRetornarStatus200YRegistroCreado() throws Exception {
        // Configuramos el mock para que devuelva el registro de prueba al guardar
        when(registroService.agregaRegistro(any(Registro.class))).thenReturn(registroPrueba);

        // Ejecutamos la petición POST enviando el objeto como JSON
        mockMvc.perform(post("/api/registro/v1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registroPrueba)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correoEmisor").value("heroe_que_encontro_mascota@gmail.com"));
    }
}