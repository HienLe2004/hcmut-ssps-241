package com.example.demo.Student;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Student")
public class Student {
    @Id
    private long id; //Mã số sinh viên (Ex 2210371), khóa chính

    @Column(name = "FullName")
    private String name;

    @Column(name ="Balance")
    private int balance;

    @Column(name = "PhoneNumber")
    private String phoneNum;

    @Column(name= "DateOfBirth")
    private Date doB;

    @Column(name ="Email")
    private String email;

    //@OneToMany
    //@Column(name = "PrintRequests")
    //private List<PrintRequest> printRequests;
    //@OneToMany
    //Column(name ="BuyLogs")
    //private List<BuyLog> buyLogs;
    public  Student(){}
    public Student(int mssv, String name,int bal, String pnum, Date dob, String email)
    {
        this.id = mssv;
        this.name = name;
        this.balance = bal;
        this.phoneNum=pnum;
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
    //Other methods
    //public void requestToPrint(){}
    //public void uploadDocument(){}
    //public void selectPrinter(){}
    //public void modifyPrintInfo(){}
    //public void viewWaitingRequest(){}
}
