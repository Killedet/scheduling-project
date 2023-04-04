package com.example.webschedule.springsecurity.service;


import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.webschedule.springsecurity.model.User;
import com.example.webschedule.springsecurity.web.dto.UserRegistrationDto;

public interface UserService extends UserDetailsService {

    User findByEmail(String email);

    User save(UserRegistrationDto registration);
    
    User findByUsername(String username);
}