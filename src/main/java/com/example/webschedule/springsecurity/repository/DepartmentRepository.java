package com.example.webschedule.springsecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.webschedule.springsecurity.model.Department;
import com.example.webschedule.springsecurity.model.Organization;
import java.util.Collection;
//import com.example.webschedule.springsecurity.model.User;

@Repository
public interface DepartmentRepository extends JpaRepository < Department, Long > {
    
    Collection<Department> getByDepartmentOrganization(Organization departmentOrganization);
	
}