package com.example.demo.Model;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(name = "printer")
public class Printer {
    @Id
    @Column(name = "printer_name")
    private String name;
    @Column(name = "location")
    private String location;
    @Column(name = "state")
    private String state;

    public Printer(){}

    public Printer(String location, String state, Configuration config, String name) {
        this.location = location;
        this.state = state;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

}
