package com.example.veterinarian.appointment.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum Status {
    creata("Creata"),
    confirmata("Confirmata"),
    incheiata("Incheiata");
    private String status;
}
