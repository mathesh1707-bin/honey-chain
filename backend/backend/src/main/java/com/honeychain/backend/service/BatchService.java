package com.honeychain.backend.service;

import com.honeychain.backend.dto.BatchRequest;
import com.honeychain.backend.dto.BatchResponse;
import com.honeychain.backend.model.Batch;
import com.honeychain.backend.model.Role;
import com.honeychain.backend.model.User;
import com.honeychain.backend.repository.BatchRepository;
import com.honeychain.backend.repository.UserRepository;
import com.honeychain.backend.util.QrCodeGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.honeychain.backend.util.HashUtil;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class BatchService {

    private final BatchRepository batchRepository;
    private final UserRepository userRepository;

    @Value("${app.public-base-url}")
    private String publicBaseUrl;

    public BatchService(BatchRepository batchRepository, UserRepository userRepository) {
        this.batchRepository = batchRepository;
        this.userRepository = userRepository;
    }

    public BatchResponse createBatch(BatchRequest request) throws Exception {
    User beekeeper = userRepository.findById(request.getBeekeeperId())
            .filter(u -> u.getRole() == Role.BEEKEEPER)
            .orElseThrow(() -> new IllegalArgumentException("Beekeeper not found"));

    Batch batch = new Batch();
    batch.setBeekeeper(beekeeper);
    batch.setQuantityKg(request.getQuantityKg());
    batch.setDateCreated(LocalDate.now());
    batch.setQrCode("HC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
    
    String previousHash = batchRepository.findTopByOrderByIdDesc()
        .map(Batch::getCurrentHash)
        .orElse("0"); // genesis value for the very first batch ever logged

    String dataToHash = previousHash + beekeeper.getId() + batch.getQuantityKg()
        + batch.getDateCreated() + batch.getQrCode();
    String currentHash = HashUtil.sha256(dataToHash);

    batch.setPreviousHash(previousHash);
    batch.setCurrentHash(currentHash);

    batchRepository.save(batch);

    String verifyUrl = publicBaseUrl + "/verify/" + batch.getQrCode();
    String qrImage = QrCodeGenerator.generateBase64(verifyUrl, 300);

    return new BatchResponse(batch.getId(), batch.getQrCode(), qrImage);
}

    public List<Batch> getBatchesForBeekeeper(Long beekeeperId) {
        User beekeeper = userRepository.findById(beekeeperId)
                .orElseThrow(() -> new IllegalArgumentException("Beekeeper not found"));
        return batchRepository.findByBeekeeper(beekeeper);
    }

    public List<Batch> getMyBatches(String username) {
        User beekeeper = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return batchRepository.findByBeekeeper(beekeeper);
    }

    public String getQrImage(String qrCode) throws Exception {
        String verifyUrl = publicBaseUrl + "/verify/" + qrCode;
        return QrCodeGenerator.generateBase64(verifyUrl, 200);
    }
    public List<Map<String, Object>> verifyChainIntegrity() {
    List<Batch> batches = batchRepository.findAllByOrderByIdAsc();
    String expectedPrevHash = "0";
    List<Map<String, Object>> report = new ArrayList<>();

    for (Batch b : batches) {
        String recomputed = HashUtil.sha256(
                expectedPrevHash + b.getBeekeeper().getId() + b.getQuantityKg()
                        + b.getDateCreated() + b.getQrCode()
        );

        boolean valid = recomputed.equals(b.getCurrentHash())
                && expectedPrevHash.equals(b.getPreviousHash());

        Map<String, Object> entry = new LinkedHashMap<>();
        entry.put("batchId", b.getId());
        entry.put("qrCode", b.getQrCode());
        entry.put("valid", valid);
        report.add(entry);

        expectedPrevHash = b.getCurrentHash(); // keep walking the chain even after a break, to show exactly where it happened
    }

    return report;
    }
}