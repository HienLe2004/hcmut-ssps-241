package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.BuyLog;
import com.example.demo.Repository.BuyLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class BuyLogController {
    @Autowired
    private BuyLogRepository buyLogRepository;

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

        if(String.valueOf(buyLogInfo.getBoughtPageNum()) != null) {
            buyLog.setBoughtPageNum(buyLogInfo.getBoughtPageNum());
        }

        if(buyLogInfo.getPaymentTime() != null) {
            buyLog.setPaymentTime(buyLogInfo.getPaymentTime());
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

    @DeleteMapping("/buyLogs")
    public ResponseEntity<Map<String, Boolean>> deleteAllBuyLogs(){
        buyLogRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
