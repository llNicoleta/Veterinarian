package com.example.veterinarian.web;

import com.example.veterinarian.appointment.VeterinarianServiceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableAutoConfiguration
@Import({VeterinarianServiceConfig.class})
@ComponentScan(basePackages = "com.example.veterinarian.web")
public class VeterinarianApplication {

    public static void main(String[] args) {
        SpringApplication.run(VeterinarianApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/rest/appointments").allowedOrigins("http://localhost:4200");
                registry.addMapping("/rest/appointments/all").allowedOrigins("http://localhost:4200");

            }
        };
    }
}
