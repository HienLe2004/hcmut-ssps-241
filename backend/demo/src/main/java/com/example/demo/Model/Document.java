package com.example.demo.Model;

import jakarta.persistence.*;


@Entity
@Table(name = "document")
public class Document {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "document_id")
    private long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileStyle;

    @Column(name = "file_path")
    private String filePath;

    @Column(name ="size")
    private float size;

    public Document(){}

    public Document(long id, String fileName, String fileStyle, float size) {
        this.id = id;
        this.fileName = fileName;
        this.fileStyle = fileStyle;
        this.size = size;
    }

    public Document(String fileName, String fileStyle, String filePath, float size) {
        this.fileName = fileName;
        this.fileStyle = fileStyle;
        this.filePath = filePath;
        this.size = size;
    }

    //document
    @OneToOne(mappedBy = "document")
    private PrintRequest printRequest;

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
        return fileStyle;
    }

    public float getSize() {
        return size;
    }

    public PrintRequest getPrintRequest() {
        return printRequest;
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

    public void setFileStyle(String fileStyle) {
        this.fileStyle = fileStyle;
    }

    public void setSize(float size) {
        this.size = size;
    }

    public void setPrintRequest(PrintRequest printRequest) {
        this.printRequest = printRequest;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
}