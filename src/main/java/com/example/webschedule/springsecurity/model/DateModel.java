package com.example.webschedule.springsecurity.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;

@Entity
@Table(name = "dates")
public class DateModel {

    @Id
    @Column(name = "date_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long dateId;
    
    @Column(name = "date_of")
    String dateString;
    
    @JsonIgnore
    @OneToMany(mappedBy = "shiftDate")
    private Collection<CalendarShifts> shifts;
    
    public DateModel() {}
    
    public DateModel(String date) {
    	this.dateString = date;
    }
    
    public String getDate() {
    	return this.dateString;
    }
    
    public void setDate(String date) {
    	this.dateString = date;
    }
    
    public Collection<CalendarShifts> getShifts(){
    	return this.shifts;
    }
    
}