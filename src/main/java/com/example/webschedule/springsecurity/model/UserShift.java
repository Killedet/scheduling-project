package com.example.webschedule.springsecurity.model;

import javax.persistence.*;


@Entity
@Table(name = "user_shifts")
public class UserShift {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	private String startAt;
	private String endAt;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_schedule_id")
	private UserSchedule schedule;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "day")
	private Day dayOf;
	
	public UserShift(String startAt, String endAt, Day dayOf) {
		this.startAt = startAt;
		this.endAt = endAt;
		this.dayOf = dayOf;
	}
	public UserShift(String startAt, String endAt, UserSchedule schedule, Day dayOf){
		this.startAt = startAt;
		this.endAt = endAt;
		this.schedule = schedule;
		this.dayOf = dayOf;
	}
	
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
    
    public UserSchedule getOwner() {
    	return schedule;
    }
    
    public void setOwner(UserSchedule schedule){
    	this.schedule = schedule;
    }
    
    public Day getDayOf() {
    	return dayOf;
    }
    
    public void setDayOf(Day dayOf) {
    	this.dayOf = dayOf;
    }
    
}
