package com.example.demo.Model;

import jakarta.persistence.*;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table (name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "report_id")
    private long id;

    @Column(name ="report_name")
    private String name;

    @Column(name = "date")
    private Date date;

    @Column(name = "file_path")
    private String filePath;

    public Report(){}

    public Report(long id, String name, Date date, String filePath) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.filePath = filePath;
    }

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}
