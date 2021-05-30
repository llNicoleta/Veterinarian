package com.example.veterinarian.appointment;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan("com.example.veterinarian.appointment")
@EntityScan("com.example.veterinarian.appointment.domain")
@EnableJpaRepositories("com.example.veterinarian.appointment.repository")
public class VeterinarianServiceConfig {
}
