package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "dates")
public class ShiftDate {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	private String date;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "day")
	private Day dateDay;
	
	public ShiftDate(String date) {
		this.date = date;
	}
	
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getDate() {
    	return date;
    }
    
    public void setDate(String date) {
    	this.date = date;
    }
    
    public Day getDateDay() {
    	return dateDay;
    }
    
    public void setDateDay(Day dateDay) {
    	this.dateDay = dateDay;
    }
    
    
    
    
}
