package com.example.demo.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "buy_log")
public class BuyLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "buylog_id")
    private Long id;

    @Column(name ="paper_size")
    private String paperSize;

    @Column(name = "number_bought_page")
    private int boughtPageNum;

    @Column(name = "price")
    private String price;

    @Column(name = "payment_time")
    private LocalDateTime paymentTime;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    public BuyLog(){}

    public BuyLog(Long id, String paperSize, int boughtPageNum, String price, LocalDateTime paymentTime, Student student) {
        this.id = id;
        this.paperSize = paperSize;
        this.boughtPageNum = boughtPageNum;
        this.price = price;
        this.paymentTime = paymentTime;
        this.student = student;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getBoughtPageNum() {
        return boughtPageNum;
    }

    public void setBoughtPageNum(int boughtPageNum) {
        this.boughtPageNum = boughtPageNum;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(LocalDateTime paymentTime) {
        this.paymentTime = paymentTime;
    }

    public String getPaperSize() {
        return paperSize;
    }

    public void setPaperSize(String paperSize) {
        this.paperSize = paperSize;
    }
}
