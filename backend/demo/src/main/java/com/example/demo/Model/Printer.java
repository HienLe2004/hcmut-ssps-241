package com.example.demo.Model;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

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
    @OneToOne
    @JoinColumn(name = "congiguration_id")
    private Configuration config;

    public Printer(){}

    public Printer(long id, String location, String state, Configuration config) {
        this.id = id;
        this.location = location;
        this.state = state;
        this.config = config;
    }

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

    public Configuration getConfig() {
        return config;
    }

    public void setConfig(Configuration config) {
        this.config = config;
    }
}
