package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "print_modification")
public class PrintModification {
    @Id
    @Column(name = "print_modification_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "paper_size")
    private String paperSize;

    @Column(name ="copies")
    private int copies;

    @Column(name ="double_sided")
    private boolean doubleSided;

    public PrintModification(){}

    public PrintModification(String paperSize, int copies, boolean doubleSided) {
        this.paperSize = paperSize;
        this.copies = copies;
        this.doubleSided = doubleSided;
    }

    //getter

    public long getId() {
        return id;
    }

    public String getPaperSize() {
        return paperSize;
    }

    public int getCopies() {
        return copies;
    }

    public boolean isDoubleSided() {
        return doubleSided;
    }

    public PrintRequest getPrintRequest() {
        return printRequest;
    }

    //setter

    public void setId(long id) {
        this.id = id;
    }

    public void setPaperSize(String paperSize) {
        this.paperSize = paperSize;
    }

    public void setCopies(int copies) {
        this.copies = copies;
    }

    public void setDoubleSided(boolean doubleSided) {
        this.doubleSided = doubleSided;
    }

    public void setPrintRequest(PrintRequest printRequest) {
        this.printRequest = printRequest;
    }

    //anh xa nguoc den Print Request
    //khong phai khoa ngoai
    @OneToOne(mappedBy = "printModification")
    private PrintRequest printRequest;
}
