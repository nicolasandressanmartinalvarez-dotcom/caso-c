package com.api.api_veterinaria;

import com.api.api_veterinaria.controller.VeterinariaController;
import com.api.api_veterinaria.dto.VeterinariaDTO;
import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.service.VeterinariaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(VeterinariaController.class)
@AutoConfigureMockMvc(addFilters = false)
public class VeterinariaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private VeterinariaService veterinariaService;

    private Veterinaria veterinariaModeloMock;
    private VeterinariaDTO veterinariaDTOMock;

    

    @BeforeEach
    void setUp() {
        veterinariaModeloMock = new Veterinaria();
        
        veterinariaModeloMock.setId(1L); 
        
        veterinariaModeloMock.setNombreVeterinaria("Veterinaria San Roque");

        veterinariaDTOMock = new VeterinariaDTO();
        veterinariaDTOMock.setNombreVeterinaria("Veterinaria San Roque");
    }
    @Test
    void obtenerTodas_DebeRetornarListaYEstadoOk() throws Exception {
        when(veterinariaService.obtenerTodos()).thenReturn(Arrays.asList(veterinariaModeloMock));

        mockMvc.perform(get("/api/veterinaria")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombreVeterinaria").value("Veterinaria San Roque"));
    }

    @Test
    void obtenerTodas_CuandoNoHayVeterinarias_DebeRetornarListaVacia() throws Exception {
        when(veterinariaService.obtenerTodos()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/veterinaria")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty()); 
    }

    @Test
    void guardar_DebeRetornarVeterinariaCreadaYEstadoOk() throws Exception {

        when(veterinariaService.guardar(any(VeterinariaDTO.class))).thenReturn(veterinariaModeloMock);

        mockMvc.perform(post("/api/veterinaria")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(veterinariaDTOMock)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombreVeterinaria").value("Veterinaria San Roque"));
    }
    @Test
    void guardar_SinCuerpo_DebeRetornarBadRequest() throws Exception {
        mockMvc.perform(post("/api/veterinaria")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()); 
    }

    @Test
    void guardar_VerificaLlamadaExactaAlServicio() throws Exception {
        when(veterinariaService.guardar(any(VeterinariaDTO.class))).thenReturn(veterinariaModeloMock);

        mockMvc.perform(post("/api/veterinaria")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(veterinariaDTOMock)))
                .andExpect(status().isOk());

        verify(veterinariaService, times(1)).guardar(any(VeterinariaDTO.class));
    }
}