package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "username"), name ="users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String username;
    private String phoneNumber;
    private String hired;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
        name = "users_roles",
        joinColumns = @JoinColumn(
            name = "users_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(
            name = "roles_id", referencedColumnName = "id"))
    private Collection < Role > roles;
    
    @OneToOne(mappedBy = "owner")
    private UserSchedule schedule;
    
    @OneToMany(mappedBy = "owner")
    private Collection < CalendarShift > scheduled;

    public User() {}

    public User(String firstName, String lastName, String email, String password, String username, String phoneNumber, String hired) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.hired = hired;
    }

    public User(String firstName, String lastName, String email, String password, String username, String phoneNumber, String hired, Collection < Role > roles, UserSchedule schedule, Collection< CalendarShift > scheduled) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.hired = hired;
        this.roles = roles;
        this.schedule = schedule;
        this.scheduled = scheduled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getHired() {
        return hired;
    }

    public void setHired(String hired) {
        this.hired = hired;
    }
    
    public Collection < Role > getRoles() {
        return roles;
    }

    public void setRoles(Collection < Role > roles) {
        this.roles = roles;
    }
    
    public UserSchedule getSchedule(){
    	return schedule;
    }
    
    public void setSchedule(UserSchedule schedule) {
    	this.schedule = schedule;
    }
    
    public Collection < CalendarShift > getScheduled(){
    	return scheduled;
    }
    
    public void setScheduled(Collection < CalendarShift >scheduled) {
    	this.scheduled = scheduled;
    }
    
    public void addScheduledShift(CalendarShift shift) {
    	this.scheduled.add(shift);
    }

    @Override
    public String toString() {
        return "User{" +
            "id=" + id +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", password='" + "*********" + '\'' +
            ", roles=" + roles +
            '}';
    }
}
