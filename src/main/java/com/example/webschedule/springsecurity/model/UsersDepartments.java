package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "users_departments")
public class UsersDepartments {

    @EmbeddedId
    private UsersDepartmentsCompositeKey id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userFK")
    @JoinColumn(name = "user_fk")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("departmentFK")
    @JoinColumn(name = "department_fk")
    Department department;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_fk")
    private Role roleInDepartment;
    
    public UsersDepartments(User u, Department dep) {
    	this.user = u;
    	this.department = dep;
    }
    
    public User getUser() {
    	return this.user;
    }
    public void setUser(User u) {
    	this.user = u;
    }
    
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