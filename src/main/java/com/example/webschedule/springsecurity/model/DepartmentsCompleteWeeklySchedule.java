package com.example.webschedule.springsecurity.model;

import java.util.Collection;

import javax.persistence.*;
//import java.util.Collection;

@Entity
@Table(name = "departments_complete_weekly_schedules")
public class DepartmentsCompleteWeeklySchedule {

    @Id
    @Column(name = "departments_complete_weekly_schedule_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long departmentsCompleteWeeklyScheduleId;
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "department_fk")
    private Department department;
    
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "weekly_departments_complete_worker_schedules",
    		joinColumns = @JoinColumn(
    				name = "departments_complete_weekly_schedule_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "worker_weekly_schedule_fk"/*,referencedColumnName = "id"*/))
    private Collection <WorkerWeeklySchedule> weeklySchedules;
    
    public DepartmentsCompleteWeeklySchedule(){}
    
    public Department getDepartment() {
    	return this.department;
    }
    
    public Collection <WorkerWeeklySchedule> getWeeklySchedules(){
    	return this.weeklySchedules;
    }
    
}