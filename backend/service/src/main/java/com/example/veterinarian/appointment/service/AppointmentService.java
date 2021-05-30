package com.example.veterinarian.appointment.service;

import com.example.veterinarian.appointment.domain.Appointment;

public interface AppointmentService {
    Iterable<Appointment> getAllAppointments();
    void save(Appointment appointment);
    Appointment findAppointment(Long appointmentId);
    void updateAppointment(Appointment appointment);
}
