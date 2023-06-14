package com.example.webschedule.springsecurity.model;

import java.util.Collection;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "departments_complete_calendar_schedules")
public class DepartmentsCompleteCalendarSchedule {

    @Id
    @Column(name = "departments_complete_calendar_schedule_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long departmentsCompleteCalendarScheduleId;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "department_fk")
    private Department department;
    
    @OneToMany(mappedBy = "calendar")
    private Collection <OverTimeSchedule> overTimeSchedules;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "calendar_departments_complete_shift_schedules",
    		joinColumns = @JoinColumn(
    				name = "departments_complete_calendar_schedule_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "calendar_shift_fk"/*,referencedColumnName = "id"*/))
    private Collection <CalendarShifts> calendarShifts;
    
    public DepartmentsCompleteCalendarSchedule(){}
    
    public Department getDepartment() {
    	return this.department;
    }
    
    public Collection<OverTimeSchedule> getOTSchedule(){
    	return this.overTimeSchedules;
    }
    
    public Collection <CalendarShifts> getCalendarShifts(){
    	return this.calendarShifts;
    }
    
}