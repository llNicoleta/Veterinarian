package com.example.veterinarian.appointment.service.exception;

public class AppointmentNotFound extends ServiceException {
    private Long id;
    public AppointmentNotFound(Long id) {
        super("Appointment with id = " + id +" not found!");
        this.id = id;
    }
}
