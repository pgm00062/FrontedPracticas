package com.tupackage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuración de Seguridad para permitir /health sin autenticación
 * 
 * Copia esto a tu SecurityConfig o crea un nuevo archivo SecurityConfig.java
 * en: src/main/java/com/tupackage/config/SecurityConfig.java
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/health").permitAll()  // Permitir /health sin autenticación
                .anyRequest().authenticated()             // Requerir autenticación para todo lo demás
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Configurar CORS
            .csrf(csrf -> csrf.disable()); // Deshabilitar CSRF para APIs REST

        return http.build();
    }
    
    // Si ya tienes un CorsConfigurationSource, úsalo aquí
    // Si no, puedes eliminar esta línea y usar solo el CorsConfig que ya tienes
    private org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        // Retorna tu configuración CORS existente
        return new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
    }
}
