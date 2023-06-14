package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "weekly_shifts")
public class WeeklyShift {

    @Id
    @Column(name = "weekly_shift_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long weeklyShiftId;
    
    private String startTime;
    private String endTime;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "day_fk")
    private Days shiftDay;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "weekly_worker_shifts_schedules",
    		joinColumns = @JoinColumn(
    				name = "weekly_shift_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "worker_weekly_schedule_fk"/*,referencedColumnName = "id"*/))
    private WorkerWeeklySchedule weeklySchedule;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "calendar_weekly_shift",
    		joinColumns = @JoinColumn(
    				name = "weekly_shift_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "calendar_shift_fk"/*,referencedColumnName = "id"*/))
    private Collection <CalendarShifts> calendarShiftsInheriting;
    
    public WeeklyShift() {}
    
    public WeeklyShift(String start, String end, Days day) {
    	this.startTime = start;
    	this.endTime = end;
    	this.shiftDay = day;
    }
    
    public String getStartTime() {
    	return this.startTime;
    }
    public void setStartTime(String start) {
    	this.startTime = start;
    }
    public String getEndTime() {
    	return this.endTime;
    }
    public void setEndTime(String end) {
    	this.endTime = end;
    }
    public Days getDay() {
    	return this.shiftDay;
    }
    
    public WorkerWeeklySchedule getWeeklySchedule() {
    	return this.weeklySchedule;
    }
    
    public void setWeeklySchedule(WorkerWeeklySchedule schedule) {
    	this.weeklySchedule = schedule;
    }
    
    public Collection<CalendarShifts> getCalendarShiftsInheriting(){
    	return this.calendarShiftsInheriting;
    }
    
}