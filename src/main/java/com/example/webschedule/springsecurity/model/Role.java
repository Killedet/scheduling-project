package com.example.webschedule.springsecurity.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "roles")//ADDED FOR NEW DB
public class Role {
	
	@Id
	@Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    
    private String roleName;
    
    @OneToMany(mappedBy ="roleInDepartment")
    private Collection <UsersDepartments> userAndDepartment;
    
    @OneToMany(mappedBy = "adminRole")
    private Collection <Admin> admins;
    
    public Role() {}
    
    public Role(String role) {
    	this.roleName = role;
    }
    
    public String getName() {
    	return this.roleName;
    }
    public void setRoleName(String role) {
    	this.roleName = role;
    }
    
    public Collection<UsersDepartments> getUserAndDepartment() {
    	return this.userAndDepartment;
    }
    
    public Collection<Admin> getAdmins(){
    	return admins;
    }
	/* OLD ROLE MODEL
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    public Role() {}

    public Role(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + id +
            ", name='" + name + '\'' +
            '}';
    }
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
}
