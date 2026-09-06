package com.honeychain.backend.controller;

import com.honeychain.backend.service.PublicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final PublicService publicService;

    public PublicController(PublicService publicService) {
        this.publicService = publicService;
    }

    @GetMapping("/verify/{qrCode}")
    public ResponseEntity<?> verify(@PathVariable String qrCode) {
        try {
            return ResponseEntity.ok(publicService.verify(qrCode));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}