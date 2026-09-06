package com.honeychain.backend.service;

import com.honeychain.backend.dto.BeekeeperResponse;
import com.honeychain.backend.dto.RegisterRequest;
import com.honeychain.backend.model.Role;
import com.honeychain.backend.model.User;
import com.honeychain.backend.repository.BatchRepository;
import com.honeychain.backend.repository.HiveReadingRepository;
import com.honeychain.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final HiveReadingRepository hiveReadingRepository;
    private final BatchRepository batchRepository;
    

    public AdminUserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                HiveReadingRepository hiveReadingRepository,BatchRepository batchRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.hiveReadingRepository = hiveReadingRepository;
        this.batchRepository = batchRepository;
    }

    public User register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already taken");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        if (request.getRole() == Role.BEEKEEPER) {
            user.setPlace(request.getPlace());
            user.setLatitude(request.getLatitude());
            user.setLongitude(request.getLongitude());
        }

        return userRepository.save(user);
    }

    public List<BeekeeperResponse> listBeekeepers() {
        return userRepository.findByRole(Role.BEEKEEPER)
            .stream().map(BeekeeperResponse::new).toList();
    }

    public BeekeeperResponse getBeekeeper(Long id) {
        User user = userRepository.findById(id)
                .filter(u -> u.getRole() == Role.BEEKEEPER)
                .orElseThrow(() -> new IllegalArgumentException("Beekeeper not found"));
        return new BeekeeperResponse(user);
    }

    
    @Transactional
    public void deleteBeekeeper(Long id) {
        User user = userRepository.findById(id)
            .filter(u -> u.getRole() == Role.BEEKEEPER)
            .orElseThrow(() -> new IllegalArgumentException("Beekeeper not found"));

        hiveReadingRepository.deleteByBeekeeper(user);
        batchRepository.deleteByBeekeeper(user);
        userRepository.delete(user);
    }  
}