package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "overtime_calendar_shifts")
public class OverTimeCalendarShifts {

    @EmbeddedId
    private OverTimeCalendarShiftsCompositeKey id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("calendarShiftFK")
    @JoinColumn(name = "calendar_shift_fk")
    CalendarShifts calendarShift;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("overTimeScheduleFK")
    @JoinColumn(name = "overtime_schedule_fk")
    OverTimeSchedule overTimeSchedule;
    
    public OverTimeCalendarShifts(CalendarShifts shift, OverTimeSchedule schedule) {
    	this.calendarShift = shift;
    	this.overTimeSchedule = schedule;
    }
    
    public CalendarShifts getUser() {
    	return this.calendarShift;
    }
    public void setUser(CalendarShifts shift) {
    	this.calendarShift = shift;
    }
    
    public OverTimeSchedule getOverTimeSchedule() {
    	return this.overTimeSchedule;
    }
    public void setOverTimeSchedule(OverTimeSchedule schedule) {
    	this.overTimeSchedule = schedule;
    }
    
    
}