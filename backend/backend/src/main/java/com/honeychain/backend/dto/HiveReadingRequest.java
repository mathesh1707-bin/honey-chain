package com.honeychain.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HiveReadingRequest {
    private double temperature;
    private double humidity;
    private double weightKg;
}