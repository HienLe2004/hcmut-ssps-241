package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @Column(name = "location_name")
    private String name;

    public Location(){}

    public Location(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
