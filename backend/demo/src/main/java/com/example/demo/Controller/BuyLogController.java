package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.BuyLog;
import com.example.demo.Model.Student;
import com.example.demo.Repository.BuyLogRepository;
import com.example.demo.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3")
@RestController
@RequestMapping("/api/v1")
public class BuyLogController {
    @Autowired
    private BuyLogRepository buyLogRepository;
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/buyLogs")
    public List<BuyLog> getAllbuyLogs(){
        return buyLogRepository.findAll();
    }

    @GetMapping("/buyLog/{id}")
    public ResponseEntity<BuyLog> getBuyLog(@PathVariable long id){
        BuyLog buyLog = buyLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buy log not exist with id :" + id));
        return ResponseEntity.ok(buyLog);
    }

    @GetMapping("/student/{id}/buyLogs")
    public List<BuyLog> getStudentBuyLogs(@PathVariable long id){
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        return buyLogRepository.findAllByStudentId(id);
    }

    @PostMapping("/buyLog")
    public BuyLog createBuyLog(@RequestBody BuyLog buyLog){
        return buyLogRepository.save(buyLog);
    }


    @PutMapping("/buyLog/{id}")
    public ResponseEntity<BuyLog> updateBuyLog(@PathVariable long id, @RequestBody BuyLog buyLogInfo) {
        BuyLog buyLog = buyLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("buy log not exist with id :" + id));

        if(buyLogInfo.getPrice() != null) {
            buyLog.setPrice(buyLogInfo.getPrice());
        }

        if(buyLogInfo.getBoughtPageNum() != 0) {
            buyLog.setBoughtPageNum(buyLogInfo.getBoughtPageNum());
        }

        if(buyLogInfo.getPaymentTime() != null) {
            buyLog.setPaymentTime(buyLogInfo.getPaymentTime());
        }
        long student_id = buyLogInfo.getStudent().getId();
        if(student_id != 0)
        {
            Student student = studentRepository.findById(student_id)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + student_id));
            buyLog.setStudent(student);
        }
        BuyLog updatedBuyLog = buyLogRepository.save(buyLog);
        return ResponseEntity.ok(updatedBuyLog);
    }

    @DeleteMapping("/buyLog/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBuyLogByID(@PathVariable long id){
        BuyLog buyLog = buyLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buy log not exist with id :" + id));
        buyLogRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted buy log with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/student/{id}/buyLogs")
    public ResponseEntity<Map<String, Boolean>> DeleteStudentBuyLogs(@PathVariable long id){
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        List<BuyLog> buyLogs = buyLogRepository.findAllByStudentId(id);
        for(BuyLog buyLog: buyLogs){
            buyLogRepository.delete(buyLog);
        }
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all buy log of student: "+ id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/buyLogs")
    public ResponseEntity<Map<String, Boolean>> deleteAllBuyLogs(){
        buyLogRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
