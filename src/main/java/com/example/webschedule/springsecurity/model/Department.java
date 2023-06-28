package com.example.webschedule.springsecurity.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @Column(name = "department_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long departmentId;
    
    private String departmentName;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "organization_fk")
    private Organization departmentOrganization;
    
    @JsonIgnore
    @OneToMany(mappedBy = "department")
    private Collection <DepartmentsCompleteWeeklySchedule> departmentSchedules;
    
    @JsonIgnore
    @OneToMany(mappedBy = "department")
    private Collection <DepartmentsCompleteCalendarSchedule> departmentCalendar;
    
    @OneToMany(mappedBy = "department")
    private Collection <UsersDepartments> users;
    
    
    
    public Department() {}
    
    public Department(String depName, Organization org) {
    	this.departmentName = depName;
    	this.departmentOrganization = org;
    }
    public Long getId() {
    	return this.departmentId;
    }
    public void setId(Long id) {
    	this.departmentId = id;
    }
    public String getName() {
    	return this.departmentName;
    }
    public void setName(String depName) {
    	this.departmentName = depName;
    }
    @JsonIgnore
    public Organization getOrganization() {
    	return this.departmentOrganization;
    }
    public void setOrganization(Organization org) {
    	this.departmentOrganization = org;
    }
    
    public Collection<DepartmentsCompleteWeeklySchedule> getSchedules(){
    	return this.departmentSchedules;
    }
    
    public Collection<DepartmentsCompleteCalendarSchedule> getCalendar(){
    	return this.departmentCalendar;
    }
    
    public Collection<UsersDepartments> getUsers(){
    	return this.users;
    }
}