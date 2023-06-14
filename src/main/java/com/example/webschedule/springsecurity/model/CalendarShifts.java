package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "calendar_shifts")
public class CalendarShifts {

    @Id
    @Column(name = "calendar_shift_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long calendarShiftId;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "date_fk")
    private DateModel shiftDate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "calendar_weekly_shift",
    		joinColumns = @JoinColumn(
    				name = "calendar_shift_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "weekly_shift_fk"/*,referencedColumnName = "id"*/))
    private WeeklyShift weeklyShift;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "users_calendar_shifts",
    		joinColumns = @JoinColumn(
    				name = "calendar_shift_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "user_fk"/*,referencedColumnName = "id"*/))
    private User owner;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "users_contributed_overtime_shifts",
    		joinColumns = @JoinColumn(
    				name = "calendar_shift_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "rser_fk"/*,referencedColumnName = "id"*/))
    private User contributer;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "calendar_departments_complete_shift_schedules",
    		joinColumns = @JoinColumn(
    				name = "calendar_shift_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "departments_complete_calendar_schedule_fk"/*,referencedColumnName = "id"*/))
    private DepartmentsCompleteCalendarSchedule calendarSchedule;
    
    public CalendarShifts() {}
    
    public CalendarShifts(DateModel date) {
    	this.shiftDate = date;
    }
    
    public DateModel getDate() {
    	return this.shiftDate;
    }
    
    public WeeklyShift getWeeklyShift() {
    	return this.weeklyShift;
    }
    
    public void setWeeklyShift(WeeklyShift shift) {
    	this.weeklyShift = shift;
    }
    
    public User getOwner() {
    	return this.owner;
    }
    
    public void setOwner(User user) {
    	this.owner = user;
    }
    
    public User getContributer() {
    	return this.contributer;
    }
    
    public void setContributer(User user) {
    	this.contributer = user;
    }
    public DepartmentsCompleteCalendarSchedule getCalendarSchedul() {
    	return this.calendarSchedule;
    }
    
    public void setCalendarSchedule(DepartmentsCompleteCalendarSchedule sched) {
    	this.calendarSchedule = sched;
    }
    
}