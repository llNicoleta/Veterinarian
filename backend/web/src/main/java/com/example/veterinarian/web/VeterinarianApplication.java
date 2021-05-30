package com.example.veterinarian.web;

import com.example.veterinarian.appointment.VeterinarianServiceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@EnableAutoConfiguration
@Import({VeterinarianServiceConfig.class})
@ComponentScan(basePackages = "com.example.veterinarian.web")
public class VeterinarianApplication {

    public static void main(String[] args) {
        SpringApplication.run(VeterinarianApplication.class, args);
    }

}
