// Controlador de ejemplo para Spring Boot
// Añade este archivo a tu proyecto Spring Boot para probar la conexión

//package com.tupackage.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api")
public class TestController {

    // Endpoint de health check
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK - Servicio funcionando correctamente");
    }

    // Endpoint para probar CORS
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Conexión exitosa desde Spring Boot");
        response.put("timestamp", new Date());
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    // Endpoint para obtener usuarios de ejemplo
    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        // Datos de ejemplo
        List<Map<String, Object>> users = new ArrayList<>();
        for (int i = 1; i <= size; i++) {
            Map<String, Object> user = new HashMap<>();
            user.put("id", (page * size) + i);
            user.put("username", "user" + i);
            user.put("email", "user" + i + "@example.com");
            user.put("firstName", "Nombre" + i);
            user.put("lastName", "Apellido" + i);
            user.put("createdAt", new Date());
            user.put("updatedAt", new Date());
            users.add(user);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("content", users);
        response.put("totalElements", 100);
        response.put("totalPages", 10);
        response.put("size", size);
        response.put("number", page);
        response.put("first", page == 0);
        response.put("last", page == 9);

        Map<String, Object> finalResponse = new HashMap<>();
        finalResponse.put("data", response);
        finalResponse.put("status", 200);
        finalResponse.put("success", true);
        finalResponse.put("message", "Usuarios obtenidos exitosamente");

        return ResponseEntity.ok(finalResponse);
    }

    // Endpoint para crear usuario
    @PostMapping("/users")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody Map<String, Object> userData) {
        Map<String, Object> newUser = new HashMap<>();
        newUser.put("id", new Random().nextInt(1000) + 1);
        newUser.put("username", userData.get("username"));
        newUser.put("email", userData.get("email"));
        newUser.put("firstName", userData.get("firstName"));
        newUser.put("lastName", userData.get("lastName"));
        newUser.put("createdAt", new Date());
        newUser.put("updatedAt", new Date());

        Map<String, Object> response = new HashMap<>();
        response.put("data", newUser);
        response.put("status", 201);
        response.put("success", true);
        response.put("message", "Usuario creado exitosamente");

        return ResponseEntity.ok(response);
    }

    // Endpoint para login
    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Validación simple (en producción usar Spring Security)
        if ("admin".equals(username) && "password".equals(password)) {
            Map<String, Object> user = new HashMap<>();
            user.put("id", 1);
            user.put("username", username);
            user.put("email", "admin@example.com");
            user.put("firstName", "Admin");
            user.put("lastName", "User");

            Map<String, Object> loginData = new HashMap<>();
            loginData.put("token", "jwt-token-example-" + System.currentTimeMillis());
            loginData.put("user", user);

            Map<String, Object> response = new HashMap<>();
            response.put("data", loginData);
            response.put("status", 200);
            response.put("success", true);
            response.put("message", "Login exitoso");

            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("data", null);
            response.put("status", 401);
            response.put("success", false);
            response.put("message", "Credenciales inválidas");

            return ResponseEntity.status(401).body(response);
        }
    }
}
