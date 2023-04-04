package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "days")
public class Day {
	@Id
	private String dayName;
	
	@OneToMany(mappedBy = "dayOf")
	private Collection< UserShift > userShifts;
	
	@OneToMany(mappedBy =  "dateDay")
	private Collection< ShiftDate > dates;
	
	public Day(String dayName) {
		this.dayName = dayName;
	}
	
	public String getDayName() {
		return dayName;
	}
	
	public void setDayName(String dayName) {
		this.dayName = dayName;
	}
	
	public Collection< UserShift > getUserShifts(){
		return userShifts;
	}
	
	public void setUserShifts(Collection< UserShift > userShifts) {
		this.userShifts = userShifts;
	}
	
	public Collection< ShiftDate > getDates(){
		return dates;
	}

	public void setDates(Collection< ShiftDate > dates) {
		this.dates = dates;
	}
	
}
