package com.example.veterinarian.appointment.service;

import com.example.veterinarian.appointment.domain.Appointment;
import com.example.veterinarian.appointment.repository.AppointmentCrudRepository;
import com.example.veterinarian.appointment.service.exception.AppointmentNotFound;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentCrudRepository appointmentCrudRepository;

    @Override
    public Iterable<Appointment> getAllAppointments() {
        return appointmentCrudRepository.findAll();
    }

    @Override
    public void save(Appointment appointment) {
        appointmentCrudRepository.save(appointment);
    }

    @Override
    public Appointment findAppointment(Long appointmentId) {
        Appointment appointment = appointmentCrudRepository.findAppointmentById(appointmentId);
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

    @Override
    public Page<Appointment> getPagedAppointments(Pageable pageable, String doctorName) {
        return doctorName == null ? appointmentCrudRepository.findAll(pageable) : appointmentCrudRepository.findAllByDoctorName(pageable, doctorName);
    }
}
