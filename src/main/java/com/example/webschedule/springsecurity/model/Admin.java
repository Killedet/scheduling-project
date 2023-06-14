package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "organization_admins")
public class Admin {

    @EmbeddedId
    private AdminCompositeKey id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userFK")
    @JoinColumn(name = "user_fk")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roleFK")
    @JoinColumn(name = "role_fk")
    Role adminRole;
    
    public Admin(User u, Role r) {
    	this.user = u;
    	this.adminRole = r;
    }
    
    public User getUser() {
    	return this.user;
    }
    public void setUser(User u) {
    	this.user = u;
    }
    
    public Role getRole() {
    	return this.adminRole;
    }
    public void setOverTimeSchedule(Role r) {
    	this.adminRole = r;
    }
    
}