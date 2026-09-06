package com.honeychain.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "batches")
@Getter
@Setter
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "beekeeper_id", nullable = false)
    private User beekeeper;

    private double quantityKg;
    private LocalDate dateCreated;

    @Column(unique = true, nullable = false)
    private String qrCode;

    private Double latitude;
    private Double longitude;
    @Column(length = 64)
    private String previousHash;

    @Column(length = 64)
    private String currentHash;
}