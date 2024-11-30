package com.example.demo.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "print_log")
public class PrintLog {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "print_log_id")
    private long id;
    @Column(name = "file_name")
    private String filename;
    @Column(name = "size_page")
    private String sizePage;
    @Column(name = "number_page")
    private int numberPage;
    @Column(name = "date")
    private LocalDate date;
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getSizePage() {
        return sizePage;
    }

    public void setSizePage(String sizePage) {
        this.sizePage = sizePage;
    }

    public int getNumberPage() {
        return numberPage;
    }

    public void setNumberPage(int numberPage) {
        this.numberPage = numberPage;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
