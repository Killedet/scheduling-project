package com.example.webschedule.springsecurity.web.dto;





public class OrganizationDto{
	private Long organizationId;
	private String organizationName;
	
	
	public Long getorganizationId() {
		return organizationId;
	}
	
	public void setorganizationId(Long id) {
		organizationId = id;
	}
	
	public String getorganizationName() {
		return organizationName;
	}
	
	public void setorganizationName(String name) {
		organizationName = name;
	}
}