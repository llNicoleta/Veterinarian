package com.example.veterinarian.appointment.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private List<Services> services;
    private String diagnosis;
    private String status = "Creata";

    public Appointment(String animalName, LocalDateTime dateTimeAppointment, String doctorName, List<Services> services) {
        this.animalName = animalName;
        this.dateTimeAppointment = dateTimeAppointment;
        this.doctorName = doctorName;
        this.services = services;
    }
}
