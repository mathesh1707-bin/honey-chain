package com.honeychain.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BatchRequest {
    private Long beekeeperId;
    private double quantityKg;
}