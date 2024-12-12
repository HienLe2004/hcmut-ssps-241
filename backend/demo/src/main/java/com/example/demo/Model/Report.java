package com.example.demo.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table (name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "report_id")
    private long id;

    @Column(name ="report_name")
    private String name;

    @CreationTimestamp
    @JsonFormat(pattern = "HH:mm dd/MM/yyyy")
    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "file_path")
    private String filePath;

    public Report(){}

    public Report(long id, String name, LocalDateTime date, String filePath) {
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
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
