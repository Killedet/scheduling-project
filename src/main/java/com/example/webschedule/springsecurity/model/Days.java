package com.example.webschedule.springsecurity.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;

@Entity
@Table(name = "days")
public class Days {

    @Id
    @Column(name = "day_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long dayId;
    
    private String dayName;
    
    @JsonIgnore
    @OneToMany(mappedBy = "shiftDay")
    private Collection <WeeklyShift> weeklyShifts;
    
    public Days() {}
    
    public Days(String day) {
    	this.dayName = day;
    }
    
    public String getName() {
    	return this.dayName;
    }
    public void setDayName(String day) {
    	this.dayName = day;
    }
    public Collection<WeeklyShift> getShifts() {
    	return this.weeklyShifts;
    }
    public void setShifts(Collection<WeeklyShift> shifts) {
    	this.weeklyShifts = shifts;
    }
    
}