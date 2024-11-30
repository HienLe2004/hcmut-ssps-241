package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table (name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "report_id")
    private long id;
    @Column(name = "date")
    private Date date;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
