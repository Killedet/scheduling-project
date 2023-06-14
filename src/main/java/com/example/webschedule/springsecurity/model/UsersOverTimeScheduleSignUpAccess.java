package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "users_overtime_schedule_sign_up_access")
public class UsersOverTimeScheduleSignUpAccess {

    @EmbeddedId
    private UsersOverTimeScheduleSignUpAccessCompositeKey id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userFK")
    @JoinColumn(name = "user_fk")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("overTimeScheduleFK")
    @JoinColumn(name = "overtime_schedule_fk")
    OverTimeSchedule overTimeSchedule;
    
    public UsersOverTimeScheduleSignUpAccess(User u, OverTimeSchedule schedule) {
    	this.user = u;
    	this.overTimeSchedule = schedule;
    }
    
    public User getUser() {
    	return this.user;
    }
    public void setUser(User u) {
    	this.user = u;
    }
    
    public OverTimeSchedule getOverTimeSchedule() {
    	return this.overTimeSchedule;
    }
    public void setOverTimeSchedule(OverTimeSchedule schedule) {
    	this.overTimeSchedule = schedule;
    }
    
}