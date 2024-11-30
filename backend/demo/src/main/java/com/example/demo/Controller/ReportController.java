package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.PrintLog;
import com.example.demo.Model.Report;
import com.example.demo.Model.Student;
import com.example.demo.Repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ReportController {
    @Autowired
    private ReportRepository reportRepository;

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
    public Report createReport(@RequestBody Report report){
        return reportRepository.save(report);
    }

    @PutMapping("/report/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable long id, @RequestBody Report reportInfo) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not exist with id :" + id));

        if(reportInfo.getDate() != null) {
            report.setDate(reportInfo.getDate());
        }

        Report updatedReport = reportRepository.save(report);
        return ResponseEntity.ok(updatedReport);
    }

    @DeleteMapping("/report/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReportByID(@PathVariable long id){
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not exist with id :" + id));
        reportRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted report with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/reports")
    public ResponseEntity<Map<String, Boolean>> deleteAllReports(){
        reportRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
