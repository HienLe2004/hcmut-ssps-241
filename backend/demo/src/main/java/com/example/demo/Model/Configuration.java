package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "configuration")
public class Configuration {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "configuration_id")
    private Long id;

    @Column(name = "model") //PIXMA, imageCLASS
    private String model;

    @Column(name = "brand") //Canon, Epson
    private String brand;

    @Column(name = "printing_technology")
    private String technology;

    @Column(name = "duplex_printing")
    private String duplexPrinting; // manual or automatic


    @OneToOne()
    @JoinColumn(name = "printer_name")
    private Printer printer;
    //@Column(name = "given_page")
    //private int givenPage;


    public Configuration() {
    }

    public Configuration(String model, String brand, String technology, String duplexPrinting) {
        this.model = model;
        this.brand = brand;
        this.technology = technology;
        this.duplexPrinting = duplexPrinting;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Printer getPrinter() {
        return printer;
    }

    public void setPrinter(Printer printer) {
        this.printer = printer;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public String getDuplexPrinting() {
        return duplexPrinting;
    }

    public void setDuplexPrinting(String duplexPrinting) {
        this.duplexPrinting = duplexPrinting;
    }

}
