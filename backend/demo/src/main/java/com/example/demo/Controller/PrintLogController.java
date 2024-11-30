package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.*;
import com.example.demo.Repository.PrintLogRepository;
import com.example.demo.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PrintLogController {
    @Autowired
    private PrintLogRepository printLogRepository;
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/printLogs")
    public List<PrintLog> getAllPrintLogs(){
        return printLogRepository.findAll();
    }

    @GetMapping("/printLog/{id}")
    public ResponseEntity<PrintLog> getPrintLog(@PathVariable long id){
        PrintLog printLog = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Log not exist with id :" + id));
        return ResponseEntity.ok(printLog);
    }
    @PostMapping("/printLog")
    public PrintLog createPrintLog(@RequestBody PrintLog detailPrintLog){
        PrintLog printLog = new PrintLog();

        long studentId = detailPrintLog.getStudent().getId();
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + studentId));
        printLog.setStudent(student);

        return printLogRepository.save(printLog);
    }

    @PutMapping("/printLog/{id}")
    public ResponseEntity<PrintLog> updatePrintLog(@PathVariable long id, @RequestBody PrintLog updateLog)
    {
        PrintLog printLog = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Log not exist with id :" + id));

        if(updateLog.getDate() != null)
            printLog.setDate(updateLog.getDate());

        if(updateLog.getFilename() != null)
            printLog.setFilename(updateLog.getFilename());

        if(String.valueOf(updateLog.getNumberPage())!= null)
            printLog.setNumberPage(updateLog.getNumberPage());

        if(updateLog.getSizePage() != null)
            printLog.setSizePage(updateLog.getSizePage());

        if(String.valueOf(updateLog.getStudent().getId()) != null)
        {
            long studentId = updateLog.getStudent().getId();
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + studentId));
            printLog.setStudent(student);
        }

        PrintLog printLog1 = printLogRepository.save(printLog);
        return ResponseEntity.ok(printLog1);
    }

    @DeleteMapping("/printLogs")
    public ResponseEntity<Map<String, Boolean>> deletePrintLogs(){
        printLogRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/printLog/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePrintLogById(@PathVariable long id){
        PrintLog printLog = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print log not exist with id :" + id));
        studentRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted print log with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
