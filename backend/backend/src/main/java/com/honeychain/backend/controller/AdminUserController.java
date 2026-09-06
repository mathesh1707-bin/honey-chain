package com.honeychain.backend.controller;

import com.honeychain.backend.dto.RegisterRequest;
import com.honeychain.backend.service.AdminUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            adminUserService.register(request);
            return ResponseEntity.ok("Registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/beekeepers")
    public ResponseEntity<?> listBeekeepers() {
        return ResponseEntity.ok(adminUserService.listBeekeepers());
    }

    @GetMapping("/beekeepers/{id}")
    public ResponseEntity<?> getBeekeeper(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(adminUserService.getBeekeeper(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/beekeepers/{id}")
    public ResponseEntity<?> deleteBeekeeper(@PathVariable Long id) {
        try {
            adminUserService.deleteBeekeeper(id);
            return ResponseEntity.ok("Deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}