package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.*;
import com.example.demo.Repository.ConfigurationRepository;
import com.example.demo.Repository.PrintLogRepository;
import com.example.demo.Repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PrinterController {
    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private ConfigurationRepository configurationRepository;

    @GetMapping("/printers")
    public List<Printer> getAllPrinters(){
        return printerRepository.findAll();
    }

    @GetMapping("/printer/{id}")
    public ResponseEntity<Printer> getPrinter(@PathVariable long id){
        Printer printer = printerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("report not exist with id :" + id));
        return ResponseEntity.ok(printer);
    }

    @PostMapping("/printer")
    public Printer createPrinter(@RequestBody Printer printerInfo){
        Printer printer = new Printer();

        long configId = printerInfo.getConfig().getId();
        Configuration config = configurationRepository.findById(configId)
                .orElseThrow(() -> new ResourceNotFoundException("Configuration not exist with id :" + configId));
        printer.setConfig(config);

        printer.setLocation(printerInfo.getLocation());

        printer.setState(printerInfo.getState());

        return printerRepository.save(printerInfo);
    }

    @PutMapping("/printer/{id}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable long id, @RequestBody Printer printerInfo) {
        Printer printer = printerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with id :" + id));

        if(printerInfo.getState() != null) {
            printer.setState(printerInfo.getState());
        }

        if(printerInfo.getLocation() != null) {
            printer.setLocation(printerInfo.getLocation());
        }

        if(printerInfo.getConfig() != null) {
            printer.setConfig(printerInfo.getConfig());
        }

        Printer updatedPrinter = printerRepository.save(printer);
        return ResponseEntity.ok(updatedPrinter);
    }

    @DeleteMapping("/printer/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePrinterByID(@PathVariable long id){
        Printer printer = printerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with id :" + id));
        printerRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted printer with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/printers")
    public ResponseEntity<Map<String, Boolean>> deleteAllPrinters(){
        printerRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
