package com.honeychain.backend.dto;

import com.honeychain.backend.*;
import com.honeychain.backend.model.Role;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class RegisterRequest {
    private String fullName;
    private String username;
    private String password;
    private String phone;
    private String place; // only relevant for BEEKEEPER
    private Double latitude;
    private Double longitude;
    private Role role;      // ADMIN or BEEKEEPER
}