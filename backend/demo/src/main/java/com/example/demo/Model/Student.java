package com.example.demo.Model;
import com.example.demo.Model.PrintRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @Column(name = "student_id")
    private long id; //Mã số sinh viên (Ex 2210371), khóa chính

    @Column(name = "full_name")
    private String name;

    @Column(name = "balance")
    private int balance;

    @Column(name = "phone_number")
    private String phoneNum;

    @Column(name = "date_of_birth")
    private Date doB;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "student", orphanRemoval = true)
    private List<PrintRequest> printRequests;

    @OneToMany(mappedBy = "student", orphanRemoval = true)
    private List<Document> documents;

    @OneToMany(mappedBy = "student", orphanRemoval = true)
    @JsonIgnore
    private List<PrintLog> printLogs;



    public Student() {
    }

    public Student(int mssv, String name, int bal, String pnum, Date dob, String email) {
        this.id = mssv;
        this.name = name;
        this.balance = bal;
        this.phoneNum = pnum;
        this.doB = dob;
        this.email = email;
    }

    //getter
    public int getBalance() {
        return balance;
    }

    public long getId() {
        return id;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public Date getDoB() {
        return doB;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public List<PrintRequest> getPrintRequests() {
        return printRequests;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public List<PrintLog> getPrintLogs() { return printLogs;}
    //setter


    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public void setDoB(Date doB) {
        this.doB = doB;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPrintRequests(List<PrintRequest> printRequests) {
        this.printRequests = printRequests;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public void setPrintLogs(List<PrintLog> printLogs) { this.printLogs = printLogs; }
//Other methods
//public void requestToPrint(){}
//public void uploadDocument(){}
}