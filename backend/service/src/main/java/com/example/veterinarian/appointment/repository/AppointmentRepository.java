package com.example.veterinarian.appointment.repository;

import com.example.veterinarian.appointment.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Appointment findAppointmentById(Long appointmentId);
}
