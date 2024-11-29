package com.example.demo.Model;
import com.example.demo.Model.Document;

import jakarta.persistence.*;

@Entity
@Table(name = "print_request")
public class PrintRequest {
    @Id
    @Column(name = "print_request_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "status")
    private String status;

    //khoa ngoai tro den bang Document
    @OneToOne
    @JoinColumn(name= "document_id", referencedColumnName = "document_id")
    private Document document;

    //khoa ngoai tro den bang PrintModification
    @OneToOne
    @JoinColumn(name = "printModification_id")
    private PrintModification printModification;

    //khoa ngoai tro den bang Student
    @ManyToOne
    @JoinColumn(name = "student_id",nullable = false)
    private Student student;

    //chua them khoa ngoai den Printer

    //getter

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
}