package com.honeychain.backend.service;

import com.honeychain.backend.dto.VerifyResponse;
import com.honeychain.backend.model.Batch;
import com.honeychain.backend.model.User;
import com.honeychain.backend.repository.BatchRepository;
import org.springframework.stereotype.Service;

@Service
public class PublicService {

    private final BatchRepository batchRepository;

    public PublicService(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

    public VerifyResponse verify(String qrCode) {
    Batch batch = batchRepository.findByQrCode(qrCode)
            .orElseThrow(() -> new IllegalArgumentException("No batch found for this code"));

    User beekeeper = batch.getBeekeeper();

    return new VerifyResponse(
            beekeeper.getFullName(),
            beekeeper.getPlace(),
            batch.getQuantityKg(),
            batch.getDateCreated().toString(),
            beekeeper.getLatitude(),
            beekeeper.getLongitude()
    );
}
}