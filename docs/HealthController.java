//package com.tupackage.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HealthController para Client Service (puerto 8080)
 * 
 * Copia este archivo a:
 * src/main/java/com/tupackage/controller/HealthController.java
 * 
 * Cambia "com.tupackage" por el package real de tu proyecto
 */
@RestController
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "OK - Client Service funcionando en puerto 8080";
    }
}
