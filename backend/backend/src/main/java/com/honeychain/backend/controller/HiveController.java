package com.honeychain.backend.controller;

import com.honeychain.backend.dto.HiveReadingRequest;
import com.honeychain.backend.service.HiveService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beekeeper")
public class HiveController {

    private final HiveService hiveService;

    public HiveController(HiveService hiveService) {
        this.hiveService = hiveService;
    }

    @GetMapping("/hive-status")
    public ResponseEntity<?> getStatus(Authentication authentication) {
        try {
            return ResponseEntity.ok(hiveService.getStatus(authentication.getName()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/hive-status")
    public ResponseEntity<?> submitReading(Authentication authentication, @RequestBody HiveReadingRequest request) {
        hiveService.submitReading(authentication.getName(), request);
        return ResponseEntity.ok("Reading recorded");
    }
}