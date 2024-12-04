package com.example.demo.Model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name ="paper_setting")
public class PaperSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private long id;

    @Column(name ="paper_size")
    private String paperSize;

    @Column(name = "valid_file_type")
    private String validFileType;

    @Column(name ="number_A4_page_default")
    private int numPage;

    @Column(name = "setting_date")
    private Timestamp settingDate;

    public PaperSetting(long id, String paperSize, String validFileType, int numPage, Timestamp settingDate) {
        this.id = id;
        this.paperSize = paperSize;
        this.validFileType = validFileType;
        this.numPage = numPage;
        this.settingDate = settingDate;
    }

    public PaperSetting() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPapersize() {
        return paperSize;
    }

    public void setPapersize(String papersize) {
        this.paperSize = papersize;
    }

    public int getNumPage() {
        return numPage;
    }

    public void setNumPage(int numPage) {
        this.numPage = numPage;
    }

    public Timestamp getSettingDate() {
        return settingDate;
    }

    public void setSettingDate(Timestamp settingDate) {
        this.settingDate = settingDate;
    }

    public String getPaperSize() {
        return paperSize;
    }

    public void setPaperSize(String paperSize) {
        this.paperSize = paperSize;
    }

    public String getValidFileType() {
        return validFileType;
    }

    public void setValidFileType(String validFileType) {
        this.validFileType = validFileType;
    }
}
