package com.honeychain.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VerifyResponse {
    private String beekeeperName;
    private String place;
    private double quantityKg;
    private String dateCreated;
    private Double latitude;
    private Double longitude;
    private String currentHash;
}