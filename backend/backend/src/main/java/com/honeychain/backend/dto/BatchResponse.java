package com.honeychain.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BatchResponse {
    private Long id;
    private String qrCode;
    private String qrImageBase64; // frontend renders as <img src="data:image/png;base64,..." />
}