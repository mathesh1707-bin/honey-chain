package com.honeychain.backend.controller;

import com.honeychain.backend.dto.BatchRequest;
import com.honeychain.backend.service.BatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/batches")
public class BatchController {

    private final BatchService batchService;

    public BatchController(BatchService batchService) {
        this.batchService = batchService;
    }

    @PostMapping
    public ResponseEntity<?> createBatch(@RequestBody BatchRequest request) {
        try {
            return ResponseEntity.ok(batchService.createBatch(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("QR generation failed");
        }
    }

    @GetMapping("/beekeeper/{beekeeperId}")
    public ResponseEntity<?> getBatchesForBeekeeper(@PathVariable Long beekeeperId) {
        try {
            return ResponseEntity.ok(batchService.getBatchesForBeekeeper(beekeeperId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}