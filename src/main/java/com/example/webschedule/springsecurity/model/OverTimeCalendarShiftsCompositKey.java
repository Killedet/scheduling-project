package com.example.webschedule.springsecurity.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
class OverTimeCalendarShiftsCompositeKey implements Serializable {
//If new version of this class is implemented consult this page to deal with serialVersionUID
//https://stackoverflow.com/questions/285793/what-is-a-serialversionuid-and-why-should-i-use-it
    @Column(name = "calendar_shift_fk")
    Long calendarShiftFK;

    @Column(name = "overtime_schedule_fk")
    Long overTimeScheduleFK;

    // standard constructors, getters, and setters
    // hashcode and equals implementation
}