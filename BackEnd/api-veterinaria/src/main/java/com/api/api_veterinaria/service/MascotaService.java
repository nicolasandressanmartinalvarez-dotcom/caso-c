package com.api.api_veterinaria.service;

import com.api.api_veterinaria.dto.MascotaDTO;
import com.api.api_veterinaria.model.Mascota;
import com.api.api_veterinaria.model.TipoMascota;
import com.api.api_veterinaria.model.TipoRaza;
import com.api.api_veterinaria.model.Veterinaria;
import com.api.api_veterinaria.repository.MascotaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Autowired
    private TipoMascotaService tipoMascotaService;

    @Autowired
    private TipoRazaService tipoRazaService;

    @Autowired
    private VeterinariaService veterinariaService;

    
    public List<Mascota> listarTodas() {
        return mascotaRepository.findAll();
    }

    
    public List<Mascota> listarPorVeterinaria(Long idVeterinaria) {
        return mascotaRepository.findAll()
                .stream()
                .filter(m -> m.getVeterinaria() != null
                        && m.getVeterinaria().getId().equals(idVeterinaria))
                .toList();
    }

    
    public Mascota obtenerPorId(Long id) {
        return mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
    }

    
    public Mascota guardar(MascotaDTO dto) {

        Mascota mascota = new Mascota();

        
        mascota.setNombre(dto.getNombre());
        mascota.setDescripcion(dto.getDescripcion());
        mascota.setCorreoReportante(dto.getCorreoReportante());
        mascota.setLatitud(dto.getLatitud());
        mascota.setLongitud(dto.getLongitud());

        
        if (dto.getTipoMascota() != null) {
            TipoMascota tipoMascota = tipoMascotaService.obtenerPorId(
                    dto.getTipoMascota().getIdTipoMascota()
            );
            mascota.setTipoMascota(tipoMascota);
        }

        if (dto.getTipoRaza() != null) {
            TipoRaza tipoRaza = tipoRazaService.obtenerPorId(
                    dto.getTipoRaza().getIdTipoRaza()
            );
            mascota.setTipoDeRaza(tipoRaza);
        }

        
        if (dto.getVeterinaria() != null) {
            Veterinaria vet = veterinariaService.buscarPorId(
                    dto.getVeterinaria().getIdVeterianaria()
            );
            mascota.setVeterinaria(vet);
        }

        
        mascota.setEntidadReportante("Veterinaria");

        return mascotaRepository.save(mascota);
    }
}