package com.example.webschedule.springsecurity.model;

import javax.persistence.*;

@Entity
@Table(name = "date_shifts")
public class CalendarShift {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	private String startAt;
	private String endAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "d_user_id")
	private User owner;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "d_date_id")
	private ShiftDate date;
	
	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getStartAt() {
    	return startAt;
    }
    
    public void setStartAt(String startAt) {
    	this.startAt = startAt;
    }
    
    public String getEndAt() {
    	return endAt;
    }
    
    public void setEndAt(String endAt) {
    	this.endAt = endAt;
    }
    
    public User getOwner() {
    	return owner;
    }
    
    public void setOwner(User owner){
    	this.owner = owner;
    }
    
    public ShiftDate getDate() {
    	return date;
    }
    
    public void setDayOf(ShiftDate date) {
    	this.date = date;
    }
}
