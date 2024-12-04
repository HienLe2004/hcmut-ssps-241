package com.example.demo.Model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "print_log")
public class PrintLog {
    @Id
    @Column(name = "print_log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "status")
    private String status;

    //khoa ngoai tro den bang Document
    @OneToOne
    @JoinColumn(name= "document_id")
    private Document document;

    //khoa ngoai tro den bang PrintModification
    @OneToOne
    @JoinColumn(name = "print_modification_id")
    private PrintModification printModification;

    //khoa ngoai tro den bang Student
    @ManyToOne
    @JoinColumn(name = "student_id",nullable = false)
    private Student student;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name ="finished_time")
    private Timestamp finishedTime;

    @ManyToOne
    @JoinColumn(name="printer_name")
    private Printer printer;

    //constructor

    public PrintLog(long id, String status, Document document, PrintModification printModification, Student student, Timestamp startTime, Timestamp finishedTime, Printer printer) {
        this.id = id;
        this.status = status;
        this.document = document;
        this.printModification = printModification;
        this.student = student;
        this.startTime = startTime;
        this.finishedTime = finishedTime;
        this.printer = printer;
    }

    public PrintLog(String status, Document document, PrintModification printModification, Student student, Timestamp startTime, Timestamp finishedTime, Printer printer) {
        this.status = status;
        this.document = document;
        this.printModification = printModification;
        this.student = student;
        this.startTime = startTime;
        this.finishedTime = finishedTime;
        this.printer = printer;
    }

    public PrintLog() {
    }
    //getter


    public Timestamp getStartTime() {
        return startTime;
    }

    public Timestamp getFinishedTime() {
        return finishedTime;
    }

    public Printer getPrinter() {
        return printer;
    }

    public long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public Document getDocument() {
        return document;
    }

    public PrintModification getPrintModification() {
        return printModification;
    }

    public Student getStudent() {
        return student;
    }

    //setter

    public void setId(long id) {
        this.id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public void setPrintModification(PrintModification printModification) {
        this.printModification = printModification;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public void setFinishedTime(Timestamp finishedTime) {
        this.finishedTime = finishedTime;
    }

    public void setPrinter(Printer printer) {
        this.printer = printer;
    }
}