package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "organizations")
public class Organization {

    @Id
    @Column(name = "organization_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long organizationId;
    
    private String organizationName;
    private String address;

    @OneToMany(mappedBy ="usersOrganization")
    private Collection <User> organizationUsers;
    
    @OneToMany(mappedBy ="departmentOrganization")
    private Collection <Department> organizationDepartments;
    
    public Organization() {}
    
    public Organization(String orgName, String orgAddress) {
    	this.organizationName = orgName;
    	this.address = orgAddress;
    }
    
    public String getName() {
    	return this.organizationName;
    }
    public void setName(String orgName) {
    	this.organizationName = orgName;
    }
    public String getAddress() {
    	return this.address;
    }
    public void setAddress(String orgAddress) {
    	this.address = orgAddress;
    }
    public Collection <User> getUsers(){
    	return this.organizationUsers;
    }
    public void setUsers(Collection <User> orgUsers) {
    	this.organizationUsers = orgUsers;
    }
}