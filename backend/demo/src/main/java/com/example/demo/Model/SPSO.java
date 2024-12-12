package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "spso")
public class SPSO {
    @Id
    @Column(name = "manager_id")
    private Long id;
    @Column(name = "full_name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNum;

    @Column(name = "date_of_birth")
    private Date doB;

    @Column(name = "email")
    private String email;

    @OneToOne
    @JoinColumn(name = "login_id")
    private Login login;

    public SPSO() {
    }

    public SPSO(Long id,
                String name,
                String phoneNum,
                Date doB,
                String email,
                Login login) {
        this.id = id;
        this.name = name;
        this.phoneNum = phoneNum;
        this.doB = doB;
        this.email = email;
        this.login = login;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public Date getDoB() {
        return doB;
    }

    public void setDoB(Date doB) {
        this.doB = doB;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
