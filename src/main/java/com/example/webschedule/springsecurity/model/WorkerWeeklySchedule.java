package com.example.webschedule.springsecurity.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;

@Entity
@Table(name = "worker_weekly_schedules")
public class WorkerWeeklySchedule {

    @Id
    @Column(name = "worker_weekly_schedule_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long workerWeeklyScheduleId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "users_weekly_worker_schedules",
    		joinColumns = @JoinColumn(
    				name = "worker_weekly_schedule_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "user_fk"/*,referencedColumnName = "id"*/))
    private User scheduleOwner;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "weekly_departments_complete_worker_schedules",
    		joinColumns = @JoinColumn(
    				name = "worker_weekly_schedule_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "departments_complete_weekly_schedule_fk"/*,referencedColumnName = "id"*/))
    private DepartmentsCompleteWeeklySchedule departmentSchedule;
    
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(
    		name = "weekly_worker_shifts_schedules",
    		joinColumns = @JoinColumn(
    				name = "worker_weekly_schedule_fk"/*,referencedColumnName = "id"*/),
    		inverseJoinColumns = @JoinColumn(
    				name = "weekly_shift_fk"/*,referencedColumnName = "id"*/))
    private Collection <WeeklyShift> weeklyShifts;
    
    
    
    public WorkerWeeklySchedule(){}
    
    public User getScheduleOwner() {
    	return this.scheduleOwner;
    }
    
    public void setScheduleOwner(User user) {
    	this.scheduleOwner = user;
    }
    
    public Collection <WeeklyShift> getWeeklyShifts(){
    	return this.weeklyShifts;
    }
    
    public DepartmentsCompleteWeeklySchedule getDepartmentSchedule() {
    	return this.departmentSchedule;
    }
    
    public void setDepartmentSchedule(DepartmentsCompleteWeeklySchedule depSched) {
    	this.departmentSchedule = depSched;
    }
}