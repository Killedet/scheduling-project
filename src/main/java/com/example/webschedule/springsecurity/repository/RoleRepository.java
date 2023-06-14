package com.example.webschedule.springsecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.webschedule.springsecurity.model.Role;
//import com.example.webschedule.springsecurity.model.User;

@Repository
public interface RoleRepository extends JpaRepository < Role, Long > {
    /* OLD DB
     * User findByEmail(String email);
     * User findByUsername(String username);
     */
    Role findByRoleName(String roleName);
	
}