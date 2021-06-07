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

    @GetMapping("/all")
    Iterable<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.findAppointment(id);
    }

    @GetMapping()
    Page<Appointment> getAppointments(
            @PageableDefault(
                size = 5,
                sort = {"dateTimeAppointment"},
                direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(name = "doctor", required = false) String doctorName) {
        return appointmentService.getPagedAppointments(pageable, doctorName);
    }

    @PostMapping()
    public ResponseEntity<String> saveAppointment(@RequestBody Appointment appointment) {
        appointmentService.save(appointment);
        return new ResponseEntity<>("Appointment saved successfully.", HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping()
    public ResponseEntity<String> updateAppointment(@RequestBody Appointment appointment) {
        appointmentService.updateAppointment(appointment);
        return new ResponseEntity<>("Appointment with id = " + appointment.getId() + " updated successfully.", HttpStatus.OK);
    }
}
