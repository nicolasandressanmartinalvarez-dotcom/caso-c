package com.sanosysalvos.mascotas_service.controller;

import com.sanosysalvos.mascotas_service.model.Mascota;
import com.sanosysalvos.mascotas_service.service.KafkaService;
import com.sanosysalvos.mascotas_service.Repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin("*")
public class MascotaController {

    @Autowired
    private MascotaRepository mascotaRepository;
    @Autowired
    private KafkaService kafkaService;

    @GetMapping
    public List<Mascota> getAllMascotas() {
        return mascotaRepository.findAll();
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<Mascota> createMascota(
            Authentication authentication,
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("tipoDeRaza") String tipoDeRaza,
            @RequestParam("direccion") String direccion,
            @RequestParam("correoReportante") String correoReportante,
            @RequestParam("imagen") MultipartFile imagenArchivo) {
        Mascota mascota = new Mascota();
        mascota.setNombre(nombre);
        mascota.setDescripcion(descripcion);
        mascota.setTipoDeRaza(tipoDeRaza);
        mascota.setDireccion(direccion);
        mascota.setCorreoReportante(correoReportante);
        if (!imagenArchivo.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + imagenArchivo.getOriginalFilename();
                Path path = Paths.get("uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, imagenArchivo.getBytes());
                mascota.setImagen(fileName);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        Mascota nuevaMascota = mascotaRepository.save(mascota);
        kafkaService.mandarNotificacion("mensaje-prueba", "Mensaje Prueba");
        return new ResponseEntity<>(nuevaMascota, HttpStatus.CREATED);
    }
}
