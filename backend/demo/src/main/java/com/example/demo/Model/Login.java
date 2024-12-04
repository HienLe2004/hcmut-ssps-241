package com.example.demo.Model;

import jakarta.persistence.*;
@Entity
@Table(name = "login_infomation")
public class Login {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name ="user_name")
    private String username;

    @Column(name ="password")
    private String password;

    public Login() {
    }

    public Login(String userName, String passWord) {
        this.username = userName;
        this.password = passWord;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassWord() {
        return password;
    }

    public void setPassWord(String passWord) {
        this.password = passWord;
    }
}
