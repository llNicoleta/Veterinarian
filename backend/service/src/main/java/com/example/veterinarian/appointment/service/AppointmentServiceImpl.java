package com.example.veterinarian.appointment.service;

import com.example.veterinarian.appointment.domain.Appointment;
import com.example.veterinarian.appointment.repository.AppointmentRepository;
import com.example.veterinarian.appointment.service.exception.AppointmentNotFound;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;

    @Override
    public Iterable<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public void save(Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    @Override
    public Appointment findAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        if (appointment == null)
            throw new AppointmentNotFound(appointmentId);
        return appointment;
    }

    @Override
    @Transactional
    public void updateAppointment(Appointment appointment) {
        Appointment appointmentToUpdate = findAppointment(appointment.getId());
        appointmentToUpdate.setAnimalName(appointment.getAnimalName());
        appointmentToUpdate.setDateTimeAppointment(appointment.getDateTimeAppointment());
        appointmentToUpdate.setDoctorName(appointment.getDoctorName());
        appointmentToUpdate.setServices(appointment.getServices());
        appointmentToUpdate.setDiagnosis(appointment.getDiagnosis());
        appointmentToUpdate.setStatus(appointment.getStatus());
    }
}
