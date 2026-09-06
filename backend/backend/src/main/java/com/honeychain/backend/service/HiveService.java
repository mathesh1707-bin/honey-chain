package com.honeychain.backend.service;

import com.honeychain.backend.dto.HiveReadingRequest;
import com.honeychain.backend.dto.HiveStatusResponse;
import com.honeychain.backend.model.HiveReading;
import com.honeychain.backend.model.User;
import com.honeychain.backend.repository.HiveReadingRepository;
import com.honeychain.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HiveService {

    private final HiveReadingRepository hiveReadingRepository;
    private final UserRepository userRepository;

    public HiveService(HiveReadingRepository hiveReadingRepository, UserRepository userRepository) {
        this.hiveReadingRepository = hiveReadingRepository;
        this.userRepository = userRepository;
    }

    // Beekeeper manually logs a reading (stands in for the ESP push, for demo purposes)
    public void submitReading(String username, HiveReadingRequest request) {
        User beekeeper = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        HiveReading reading = new HiveReading();
        reading.setBeekeeper(beekeeper);
        reading.setTemperature(request.getTemperature());
        reading.setHumidity(request.getHumidity());
        reading.setWeightKg(request.getWeightKg());
        reading.setRecordedAt(LocalDateTime.now());

        hiveReadingRepository.save(reading);
    }

    public HiveStatusResponse getStatus(String username) {
        User beekeeper = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        HiveReading latest = hiveReadingRepository
                .findTopByBeekeeperOrderByRecordedAtDesc(beekeeper)
                .orElse(null);

        if (latest == null) {
            return new HiveStatusResponse(false, null, null, null, null);
        }

        return new HiveStatusResponse(
                true, latest.getTemperature(), latest.getHumidity(), latest.getWeightKg(),
                latest.getRecordedAt().toString()
        );
    }
}