package com.example.webschedule.springsecurity.model;
import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "user_schedules")
public class UserSchedule {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@OneToOne
	@JoinColumn(name = "owner")
	private User owner;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "department_sched")
	private DepartmentSchedule department;
	
	@OneToMany(mappedBy = "schedule")
	private Collection < UserShift > userShifts;
	
	public UserSchedule(User owner, DepartmentSchedule department, Collection< UserShift > userShifts) {
		this.owner = owner;
		this.department = department;
		this.userShifts = userShifts;
	}
	public UserSchedule(DepartmentSchedule department, Collection< UserShift > userShifts) {
		this.department = department;
		this.userShifts = userShifts;
	}
	
	public User getOwner() {
		return owner;
	}
	public void setOwner(User owner) {
		this.owner = owner;
	}
	
	public DepartmentSchedule getDepartment() {
		return department;
	}
	public void setDepartment(DepartmentSchedule department) {
		this.department = department;
	}
	
	public Collection< UserShift > getUserShifts(){
		return userShifts;
	}
	public void setUserShifts(Collection< UserShift > userShifts) {
		this.userShifts = userShifts;
	}
}
