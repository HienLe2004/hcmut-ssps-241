package com.example.demo.Model;
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

    @OneToOne
    @JoinColumn(name ="login_id")
    private Login login;

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

    public Student(long id, String name, int balance, String phoneNum, Date doB, String email, Login login) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.phoneNum = phoneNum;
        this.doB = doB;
        this.email = email;
        this.login = login;
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

    public Login getLogin() {
        return login;
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

    public void setLogin(Login login) {
        this.login = login;
    }
}