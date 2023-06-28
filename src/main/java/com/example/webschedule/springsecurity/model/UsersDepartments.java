package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "users_departments")
public class UsersDepartments {

    @EmbeddedId
    private UsersDepartmentsCompositeKey id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userFK")
    @JoinColumn(name = "user_fk")
    User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("departmentFK")
    @JoinColumn(name = "department_fk")
    Department department;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_fk")
    private Role roleInDepartment;
    
    public UsersDepartments() {
    	
    }
    public UsersDepartments(User u, Department dep, Role role) {
    	this.user = u;
    	this.department = dep;
    	this.roleInDepartment = role;
    }
    
    public User getUser() {
    	return this.user;
    }
    public void setUser(User u) {
    	this.user = u;
    }
    @JsonIgnore
    public Department getDepartment() {
    	return this.department;
    }
    public void setDepartment(Department dep) {
    	this.department = dep;
    }
    
    public void setRole(Role role) {
    	this.roleInDepartment = role;
    }
    public Role getRole() {
    	return this.roleInDepartment;
    }
}