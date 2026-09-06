package com.honeychain.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HiveStatusResponse {
    private boolean connected;
    private Double temperature;
    private Double humidity;
    private Double weightKg;
    private String lastSeen;
}