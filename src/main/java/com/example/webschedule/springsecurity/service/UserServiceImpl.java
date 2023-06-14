package com.example.webschedule.springsecurity.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.webschedule.springsecurity.model.Role;
import com.example.webschedule.springsecurity.model.User;
import com.example.webschedule.springsecurity.repository.UserRepository;
import com.example.webschedule.springsecurity.repository.OrganizationRepository;
import com.example.webschedule.springsecurity.repository.RoleRepository;
import com.example.webschedule.springsecurity.web.dto.UserRegistrationDto;

@Service
public class UserServiceImpl implements UserService {
	
	private ZoneId timezone = ZoneId.of("America/Montreal");
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Lazy
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User findByUsername(String username) {
    	return userRepository.findByUsername(username);
    }

    public User save(UserRegistrationDto registration) {
    	System.out.println("DATE" + LocalDate.now( timezone ).toString());
        User user = new User();
        user.setUsername(registration.getUsername());
        user.setPhoneNumber(registration.getPhoneNumber());
        user.setFirstName(registration.getFirstName());
        user.setLastName(registration.getLastName());
        user.setEmail(registration.getEmail());
        user.setHired(LocalDate.now( timezone ));
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setOrganization(organizationRepository.getReferenceById((long)1));
        user.setRoles(Arrays.asList(/*roleRepository.getReferenceById((long)1)*/roleRepository.findByRoleName("ROLE_ADMIN")));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
            user.getPassword(),
            mapRolesToAuthorities(user.getRoles()));
    }

    private Collection < ? extends GrantedAuthority > mapRolesToAuthorities(Collection < Role > roles) {
        return roles.stream()
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .collect(Collectors.toList());
    }
}
