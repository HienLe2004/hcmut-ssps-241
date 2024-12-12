package com.example.demo.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "printer")
public class Printer {
    @Id
    @Column(name = "printer_name")
    private String name;
    @Column(name = "location")
    private String location;
    @Column(name = "description")
    private String description;
    @Column(name = "start_time")
    @CreationTimestamp
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    private LocalDateTime startTime;
    @Column(name = "state")
    private String state;

    public Printer(){}

    public Printer(String location, String state, String description, LocalDateTime startTime, Configuration config, String name) {
        this.location = location;
        this.state = state;
        this.description = description;
        this.startTime = startTime;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

}
