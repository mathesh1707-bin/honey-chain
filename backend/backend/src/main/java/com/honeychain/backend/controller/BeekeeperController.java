package com.honeychain.backend.controller;

import com.honeychain.backend.service.BatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beekeeper")
public class BeekeeperController {

    private final BatchService batchService;

    public BeekeeperController(BatchService batchService) {
        this.batchService = batchService;
    }

    @GetMapping("/batches")
    public ResponseEntity<?> myBatches(Authentication authentication) {
        try {
            return ResponseEntity.ok(batchService.getMyBatches(authentication.getName()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}