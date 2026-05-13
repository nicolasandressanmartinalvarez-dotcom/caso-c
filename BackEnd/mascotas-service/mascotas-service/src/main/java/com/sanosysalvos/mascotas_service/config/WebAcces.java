package com.sanosysalvos.mascotas_service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAcces implements WebMvcConfigurer{
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapea la URL "/imagenes/**" a la carpeta física "uploads" en tu disco
        registry.addResourceHandler("/imagenes/**").addResourceLocations("file:uploads/");
    }
}
