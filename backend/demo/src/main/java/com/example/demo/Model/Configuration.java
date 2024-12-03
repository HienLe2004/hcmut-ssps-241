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
    @Column(name = "page_size")
    private int pageSize;
    @Column(name = "permitted_file")
    private String permittedFile; // "pdf,word"
    @Column(name = "given_page")
    private int givenPage;

    public List<String> getpermittedFile() {
        return Arrays.asList(permittedFile.split(",")); // Chuyển chuỗi thành danh sách
    }

    public Configuration(){}

    public Configuration(Long id, int pageSize, String permittedFile, int givenPage) {
        this.id = id;
        this.pageSize = pageSize;
        this.permittedFile = permittedFile;
        this.givenPage = givenPage;
    }

    public String getpermittedStringFile(){
        return permittedFile;
    }

    public void setpermittedFile(String listString) {
        permittedFile = listString;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getGivenPage() {
        return givenPage;
    }

    public void setGivenPage(int givenPage) {
        this.givenPage = givenPage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
