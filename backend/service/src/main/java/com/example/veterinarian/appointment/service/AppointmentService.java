package com.example.veterinarian.appointment.service;

import com.example.veterinarian.appointment.domain.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppointmentService {
    Iterable<Appointment> getAllAppointments();
    void save(Appointment appointment);
    Appointment findAppointment(Long appointmentId);
    void updateAppointment(Appointment appointment);
    Page<Appointment> getPagedAppointments(Pageable pageable);
    Page<Appointment> getAppointmentsByDoctorName(Pageable pageable, String doctorName);
}
