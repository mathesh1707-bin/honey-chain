package com.honeychain.backend.dto;

import com.honeychain.backend.model.User;
import lombok.Getter;

@Getter
public class BeekeeperResponse {
    private final Long id;
    private final String fullName;
    private final String username;
    private final String phone;
    private final String place;

    public BeekeeperResponse(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.username = user.getUsername();
        this.phone = user.getPhone();
        this.place = user.getPlace();
    }
}