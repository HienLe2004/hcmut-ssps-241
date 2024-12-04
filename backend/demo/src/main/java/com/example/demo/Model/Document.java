package com.example.demo.Model;

import jakarta.persistence.*;


@Entity
@Table(name = "document")
public class Document {
    @Id
    @Column(name = "document_id")
    private long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "file_path")
    private String filePath;

    public Document(){}

    public Document(String fileName, String fileType, String filePath) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
    }

    public Document(long id, String fileName, String fileType, String filePath, Student student) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
        this.student = student;
    }

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    //getter

    public long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileStyle() {
        return fileType;
    }

    public Student getStudent() {
        return student;
    }

    public String getFilePath() {
        return filePath;
    }

    //setter

    public void setId(long id) {
        this.id = id;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileStyle(String fileType) {
        this.fileType = fileType;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}