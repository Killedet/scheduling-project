package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "users_overtime_schedule_contribution_access")
public class UsersOverTimeScheduleContributionAccess {

    @EmbeddedId
    private UsersOverTimeScheduleContributionAccessCompositeKey id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userFK")
    @JoinColumn(name = "user_fk")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("overTimeScheduleFK")
    @JoinColumn(name = "overtime_schedule_fk")
    OverTimeSchedule overTimeSchedule;
    
    public UsersOverTimeScheduleContributionAccess(User u, OverTimeSchedule schedule) {
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