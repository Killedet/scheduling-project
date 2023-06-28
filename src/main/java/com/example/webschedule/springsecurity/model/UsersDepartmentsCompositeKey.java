package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
class UsersDepartmentsCompositeKey implements Serializable {
//If new version of this class is implemented consult this page to deal with serialVersionUID
//https://stackoverflow.com/questions/285793/what-is-a-serialversionuid-and-why-should-i-use-it
    @Column(name = "user_fk")
    Long userFK;

    @Column(name = "department_fk")
    Long departmentFK;

    public UsersDepartmentsCompositeKey() {
    	
    }
    public UsersDepartmentsCompositeKey(Long u, Long d) {
    	this.userFK = u;
    	this.departmentFK = d;
    }
    
    public Long getUserFK() {
    	return this.userFK;
    }
    public void setUserFK(Long u) {
    	this.userFK = u;
    }
    
    public Long getDepartmentFK() {
    	return this.departmentFK;
    }
    public void setDepartmentFK(Long d) {
    	this.departmentFK = d;
    }
    // standard constructors, getters, and setters
    // hashcode and equals implementation
}