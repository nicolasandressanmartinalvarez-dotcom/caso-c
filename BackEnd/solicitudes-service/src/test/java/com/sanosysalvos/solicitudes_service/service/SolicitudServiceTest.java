package com.sanosysalvos.solicitudes_service.service;

import com.sanosysalvos.solicitudes_service.dto.SolicitudDTO;
import com.sanosysalvos.solicitudes_service.model.Solicitud;
import com.sanosysalvos.solicitudes_service.repository.SolicitudRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para SolicitudService.
 *
 * Prueba 1: Crear una solicitud → Debe autogenerar código "SOL-XXXX", fecha de
 * creación y estado "PENDIENTE".
 * Prueba 2: Obtener todas las solicitudes → Debe retornar una lista de DTOs.
 * Prueba 3: Obtener solicitud por ID (existente) → Debe retornar el DTO
 * correspondiente.
 * Prueba 4: Obtener solicitud por ID (no existente) → Debe retornar Optional
 * vacío.
 * Prueba 5: Actualizar estado a APROBADA → Debe registrar automáticamente la
 * fecha de resolución.
 */
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SolicitudServiceTest {

    @Mock
    private SolicitudRepository repository;

    @InjectMocks
    private SolicitudService service;

    private Solicitud solicitudEntidad;
    private SolicitudDTO solicitudDTO;

    // ─── Setup
    // ────────────────────────────────────────────────────────────────────

    @BeforeEach
    void setUp() {
        solicitudEntidad = new Solicitud();
        solicitudEntidad.setId(1L);
        solicitudEntidad.setCodigoSolicitud("SOL-0001");
        solicitudEntidad.setTipoSolicitud("AU");
        solicitudEntidad.setMensaje("Solicitud de administración de usuario");
        solicitudEntidad.setTipoEmisor("VETERINARIA");
        solicitudEntidad.setCorreoEmisor("veterinaria@test.com");
        solicitudEntidad.setCorreoGestor("admin@test.com");
        solicitudEntidad.setEstadoSolicitud("PENDIENTE");
        solicitudEntidad.setFechaCreacion(LocalDateTime.now());
        solicitudEntidad.setFechaResolucion(null);

        solicitudDTO = new SolicitudDTO();
        solicitudDTO.setTipoSolicitud("AU");
        solicitudDTO.setMensaje("Solicitud de administración de usuario");
        solicitudDTO.setTipoEmisor("VETERINARIA");
        solicitudDTO.setCorreoEmisor("veterinaria@test.com");
        solicitudDTO.setCorreoGestor("admin@test.com");
    }

    // ─── Test 1: Crear Solicitud
    // ──────────────────────────────────────────────────

    @Test
    @Order(1)
    @DisplayName("T1 - Crear solicitud: debe autogenerar código SOL-XXXX, fechaCreacion y estado PENDIENTE")
    void crearSolicitud_DebeAutogenerarCodigoFechaYEstado() {

        when(repository.count()).thenReturn(0L);
        when(repository.save(any(Solicitud.class))).thenReturn(solicitudEntidad);

        SolicitudDTO resultado = service.crear(solicitudDTO);

        assertNotNull(resultado, "El resultado no debe ser nulo");
        assertEquals("SOL-0001", resultado.getCodigoSolicitud(), "El código debe ser SOL-0001");
        assertEquals("PENDIENTE", resultado.getEstadoSolicitud(), "El estado inicial debe ser PENDIENTE");
        assertNotNull(resultado.getFechaCreacion(), "La fecha de creación debe ser asignada automáticamente");
        verify(repository, times(1)).save(any(Solicitud.class));
    }

    // ─── Test 2: Obtener todas las solicitudes ─────────────────────────────────

    @Test
    @Order(2)
    @DisplayName("T2 - Obtener todas: debe retornar una lista de SolicitudDTO con todos los registros")
    void obtenerTodas_DebeRetornarListaDTO() {
        when(repository.findAll()).thenReturn(List.of(solicitudEntidad));

        List<SolicitudDTO> resultado = service.obtenerTodas();

        assertNotNull(resultado, "La lista no debe ser nula");
        assertFalse(resultado.isEmpty(), "La lista no debe estar vacía");
        assertEquals(1, resultado.size(), "Debe retornar exactamente un elemento");
        assertEquals("SOL-0001", resultado.get(0).getCodigoSolicitud());
        verify(repository, times(1)).findAll();
    }

    // ─── Test 3: Obtener por ID (existe) ─────────────────────────────────────────

    @Test
    @Order(3)
    @DisplayName("T3 - Obtener por ID existente: debe retornar el DTO correspondiente")
    void obtenerPorId_Existente_DebeRetornarDTO() {
        when(repository.findById(1L)).thenReturn(Optional.of(solicitudEntidad));

        Optional<SolicitudDTO> resultado = service.obtenerPorId(1L);

        assertTrue(resultado.isPresent(), "Debe encontrar la solicitud con ID 1");
        assertEquals(1L, resultado.get().getId(), "El ID del DTO debe ser 1");
        assertEquals("VETERINARIA", resultado.get().getTipoEmisor());
        verify(repository, times(1)).findById(1L);
    }

    // ─── Test 4: Obtener por ID (no existe) ──────────────────────────────────────

    @Test
    @Order(4)
    @DisplayName("T4 - Obtener por ID inexistente: debe retornar un Optional vacío")
    void obtenerPorId_Inexistente_DebeRetornarVacio() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        Optional<SolicitudDTO> resultado = service.obtenerPorId(99L);

        assertFalse(resultado.isPresent(), "No debe encontrar una solicitud con ID 99");
        verify(repository, times(1)).findById(99L);
    }

    // ─── Test 5: Actualizar estado a APROBADA
    // ─────────────────────────────────────

    @Test
    @Order(5)
    @DisplayName("T5 - Actualizar a APROBADA: debe registrar automáticamente la fechaResolucion")
    void actualizarEstado_AAprobada_DebeRegistrarFechaResolucion() {
        SolicitudDTO dtoActualizado = new SolicitudDTO();
        dtoActualizado.setTipoSolicitud("AU");
        dtoActualizado.setMensaje("Solicitud de administración de usuario");
        dtoActualizado.setTipoEmisor("VETERINARIA");
        dtoActualizado.setCorreoEmisor("veterinaria@test.com");
        dtoActualizado.setCorreoGestor("admin@test.com");
        dtoActualizado.setEstadoSolicitud("APROBADA");

        Solicitud entidadResuelta = new Solicitud();
        entidadResuelta.setId(1L);
        entidadResuelta.setCodigoSolicitud("SOL-0001");
        entidadResuelta.setTipoSolicitud("AU");
        entidadResuelta.setMensaje("Solicitud de administración de usuario");
        entidadResuelta.setTipoEmisor("VETERINARIA");
        entidadResuelta.setCorreoEmisor("veterinaria@test.com");
        entidadResuelta.setCorreoGestor("admin@test.com");
        entidadResuelta.setEstadoSolicitud("APROBADA");
        entidadResuelta.setFechaCreacion(LocalDateTime.now().minusDays(1));
        entidadResuelta.setFechaResolucion(LocalDateTime.now());

        when(repository.findById(1L)).thenReturn(Optional.of(solicitudEntidad));
        when(repository.save(any(Solicitud.class))).thenReturn(entidadResuelta);

        SolicitudDTO resultado = service.actualizar(1L, dtoActualizado);

        assertEquals("APROBADA", resultado.getEstadoSolicitud(), "El estado debe ser APROBADA");
        assertNotNull(resultado.getFechaResolucion(), "La fecha de resolución debe ser registrada al aprobar");
        verify(repository, times(1)).save(any(Solicitud.class));
    }
}
