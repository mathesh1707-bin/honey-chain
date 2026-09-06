package com.honeychain.backend.repository;

import com.honeychain.backend.model.HiveReading;
import com.honeychain.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HiveReadingRepository extends JpaRepository<HiveReading, Long> {
    Optional<HiveReading> findTopByBeekeeperOrderByRecordedAtDesc(User beekeeper);
    void deleteByBeekeeper(User beekeeper);
}