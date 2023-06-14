package com.example.webschedule.springsecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.webschedule.springsecurity.model.Organization;
//import com.example.webschedule.springsecurity.model.User;

@Repository
public interface OrganizationRepository extends JpaRepository < Organization, Long > {
    
    
	
}