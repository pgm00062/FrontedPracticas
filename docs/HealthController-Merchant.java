//package com.tupackage.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HealthController para Merchant Service (puerto 8081)
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
        return "OK - Merchant Service funcionando en puerto 8081";
    }
}
