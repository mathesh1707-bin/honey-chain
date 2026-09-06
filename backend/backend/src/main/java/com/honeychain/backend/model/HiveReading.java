package com.honeychain.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "hive_readings")
@Getter
@Setter
public class HiveReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "beekeeper_id", nullable = false)
    private User beekeeper;

    private double temperature;
    private double humidity;
    private double weightKg;
    private LocalDateTime recordedAt;
}