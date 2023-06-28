package com.example.webschedule.springsecurity.web;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.webschedule.springsecurity.repository.DepartmentRepository;
import com.example.webschedule.springsecurity.model.Department;
import com.example.webschedule.springsecurity.repository.OrganizationRepository;
import com.example.webschedule.springsecurity.model.Organization;
import com.example.webschedule.springsecurity.web.dto.OrganizationDto;

import java.util.Collection;
import java.util.ArrayList;
import java.lang.Long;



@RestController
class AjaxRequestController{
	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Autowired
	private OrganizationRepository organizationRepository;
	
	/*@PostMapping(value ="/departments",
			consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})*/
	@RequestMapping(value = "/departments", headers = "Accept=application/json", method = RequestMethod.POST)
	public Collection<Department> getOrganizationDepartments(@RequestBody @Valid OrganizationDto orgDto /*HttpServletRequest request*/){
		
		Collection<Department> departments = new ArrayList<Department>();
		Long orgIdLong = orgDto.getorganizationId();
		Organization org = organizationRepository.findById(orgIdLong).orElse(null);
		if(org != null) {
			departments = departmentRepository.findAllByDepartmentOrganization(org);
		}
		
		return departments;
	}
}