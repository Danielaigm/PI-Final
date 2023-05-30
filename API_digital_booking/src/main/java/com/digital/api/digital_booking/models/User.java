package com.digital.api.digital_booking.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
//all methods are getters and setters
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)// auto increment
    private Long id_user;
    private String name;
    private String email;
    private String password;
    private String role;



}
