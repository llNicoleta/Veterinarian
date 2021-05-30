package com.example.veterinarian.appointment.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String animalName;
    private LocalDateTime dateTimeAppointment;
    private String doctorName;
    @OneToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    private List<Service> services;
    private String diagnosis;
    private Status status = Status.creata;

    public Appointment(String animalName, LocalDateTime dateTimeAppointment, String doctorName, List<Service> services) {
        this.animalName = animalName;
        this.dateTimeAppointment = dateTimeAppointment;
        this.doctorName = doctorName;
        this.services = services;
    }
}
