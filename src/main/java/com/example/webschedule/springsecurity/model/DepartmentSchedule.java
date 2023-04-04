package com.example.webschedule.springsecurity.model;
import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "department_schedules")
public class DepartmentSchedule {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	private String department;
	
	@OneToMany(mappedBy = "department")
	private Collection< UserSchedule > userSchedules;
	
	public DepartmentSchedule(String department, Collection< UserSchedule > userSchedules) {
		this.department = department;
		this.userSchedules = userSchedules;
	}
	public DepartmentSchedule(String department) {
		this.department = department;
	}
	
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	
	public Collection< UserSchedule > getUserSchedules(){
		return userSchedules;
	}
	public void setUserSchedules(Collection< UserSchedule > userSchedules) {
		this.userSchedules = userSchedules;
	}
}
