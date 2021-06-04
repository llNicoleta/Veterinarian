package com.example.veterinarian.appointment.repository;

import com.example.veterinarian.appointment.domain.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentCrudRepository extends JpaRepository<Appointment, Long> {
    Appointment findAppointmentById(Long appointmentId);
    Page<Appointment> findAllByDoctorName(Pageable pageable, String doctorName);
}
