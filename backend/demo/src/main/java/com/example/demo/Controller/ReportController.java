package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.Report;
import com.example.demo.Repository.ReportRepository;
import com.example.demo.Service.FileService;

import com.example.demo.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ReportController {
    @Autowired
    private ReportRepository reportRepository;

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    private FileService fileService = new FileService();

    @GetMapping("/reports")
    public List<Report> getAllReports(){
        return reportRepository.findAll();
    }

    @GetMapping("/report/{id}")
    public ResponseEntity<Report> getReport(@PathVariable long id){
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("report not exist with id :" + id));
        return ResponseEntity.ok(report);
    }

    @PostMapping("/report")
    public Report exportExcel(@RequestBody Report reportDetail) throws IOException {

        Report report = reportService.generateExcelReport(reportDetail.getStartDate(), reportDetail.getEndDate(), reportDetail.isMonth());
        report.setId(reportDetail.getId());
        return reportRepository.save(report);
    }


    @DeleteMapping("/report/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReportByID(@PathVariable long id){
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not exist with id :" + id));
        //fileService.deleteFile(report.getFilePath());
        reportRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted report with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/reports")
    public ResponseEntity<Map<String, Boolean>> deleteAllReports(){
        //fileService.deleteAllFile("/reports");
        reportRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
