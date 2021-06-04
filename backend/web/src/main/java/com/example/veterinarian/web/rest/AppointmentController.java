package com.example.veterinarian.web.rest;

import com.example.veterinarian.appointment.domain.Appointment;
import com.example.veterinarian.appointment.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/rest/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping()
    public Iterable<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping(value = "/paged")
    Page<Appointment> getByPage(@PageableDefault(
            size = 5,
            sort = {"dateTimeAppointment"},
            direction = Sort.Direction.DESC) Pageable pageable) {
        return appointmentService.getPagedAppointments(pageable);
    }

    @GetMapping(value = "/paged/doctor/{doctorName}")
    Iterable<Appointment> getAppointmentsForDoctor(@PageableDefault(
            size = 5,
            sort = {"dateTimeAppointment"},
            direction = Sort.Direction.DESC) Pageable pageable, @PathVariable("doctorName") String doctorName) {
        return appointmentService.getAppointmentsByDoctorName(pageable, doctorName);
    }

    @PostMapping()
    public ResponseEntity<String> saveAppointment(@RequestBody Appointment appointment) {
        appointmentService.save(appointment);
        return new ResponseEntity<>("Appointment saved successfully.", HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<String> updateAppointment(@RequestBody Appointment appointment) {
        appointmentService.updateAppointment(appointment);
        return new ResponseEntity<>("Appointment with id = " + appointment.getId() + " updated successfully.", HttpStatus.OK);
    }
}
