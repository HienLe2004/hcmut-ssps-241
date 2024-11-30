package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "printer")
public class Printer {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "printer_id")
    private long id;
    @Column(name = "location")
    private String location;
    @Column(name = "state")
    private String state;
    @Column(name = "congiguration")
    private String config; // xai string tam thoi

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }
}
