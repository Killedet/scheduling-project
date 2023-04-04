package com.example.webschedule.springsecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.webschedule.springsecurity.model.User;

@Repository
public interface UserRepository extends JpaRepository < User, Long > {
    User findByEmail(String email);
    
    User findByUsername(String username);
}