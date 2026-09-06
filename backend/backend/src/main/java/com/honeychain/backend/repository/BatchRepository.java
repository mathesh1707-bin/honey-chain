package com.honeychain.backend.repository;

import com.honeychain.backend.model.Batch;
import com.honeychain.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BatchRepository extends JpaRepository<Batch, Long> {
    List<Batch> findByBeekeeper(User beekeeper);
    Optional<Batch> findByQrCode(String qrCode);

    long countByBeekeeper(User beekeeper);

    void deleteByBeekeeper(User beekeeper);
    Optional<Batch> findTopByOrderByIdDesc();
    List<Batch> findAllByOrderByIdAsc();
}