package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.*;
import com.example.demo.Repository.PrintingSystemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/v1")
public class PrintingSystemController {
    @Autowired
    private PrintingSystemRepository printingSystemRepository;

    @GetMapping("/printingSystems")
    public List<PrintingSystem> getAllPrintingSystem(){
        return printingSystemRepository.findAll();
    }

    @GetMapping("/printingSystem/{id}")
    public ResponseEntity<PrintingSystem> getPrintingSystemById(@PathVariable Long id)
    {
        PrintingSystem printingSystem = printingSystemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PrintingSystem not exist with id :" + id));
        return ResponseEntity.ok(printingSystem);
    }

    @GetMapping("/{id}/printers")
    public List<Printer> getPrinterById(@PathVariable Long id){
        PrintingSystem printingSystem = printingSystemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Printer does not exist with printing system id :" + id));
        return printingSystem.getPrinters();
    }

    @GetMapping("printingSystem/{id}/printLogs")
    public List<PrintLog> getPrintLogById(@PathVariable Long id){
        PrintingSystem printingSystem = printingSystemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print log does not exist with printing system id :" + id));
        return printingSystem.getPrintLogs();
    }

    @PostMapping("/printingSystems")
    public PrintingSystem createPrintingSystem(@RequestBody PrintingSystem printingSystem){
        return printingSystemRepository.save(printingSystem);
    }

    @DeleteMapping("/printingSystems/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePrintingSystemByID(@PathVariable long id){
        PrintingSystem printingSystem = printingSystemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PrintingSystem not exist with id :" + id));
        printingSystemRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted PrintingSystem with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/printingSystems")
    public ResponseEntity<Map<String, Boolean>> deleteAllPrintingSystems(){
        printingSystemRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
