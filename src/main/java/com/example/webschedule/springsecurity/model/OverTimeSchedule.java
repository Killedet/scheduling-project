package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "overtime_schedules")
public class OverTimeSchedule {

    @Id
    @Column(name = "overtime_schedule_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long overtimeScheduleId;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "departments_complete_calendar_schedule_fk")
    private DepartmentsCompleteCalendarSchedule calendar;
    
    public OverTimeSchedule(){}
    
    public DepartmentsCompleteCalendarSchedule getDepartment() {
    	return this.calendar;
    }
    
}