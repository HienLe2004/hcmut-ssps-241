package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.*;
import com.example.demo.Repository.ConfigurationRepository;
import com.example.demo.Repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class PrinterController {
    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private ConfigurationRepository configurationRepository;

    @GetMapping("/printers")
    public List<Printer> getAllPrinters(){
        return printerRepository.findAll();
    }

    @GetMapping("/printer/{name}")
    public ResponseEntity<Printer> getPrinter(@PathVariable String name){
        Printer printer = printerRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("report not exist with name :" + name));
        return ResponseEntity.ok(printer);
    }

    @PostMapping("/printer")
    public Printer createPrinter(@RequestBody Printer printerInfo){
        Printer printer = new Printer();
        List<Printer> existingPrintersAtLocation = printerRepository.findByLocation(printerInfo.getLocation());
        int count = existingPrintersAtLocation.size();
        printerInfo.setName(printerInfo.getLocation() + "-" + (count + 1));
        printerInfo.setState("on");
    
        printer.setName(printerInfo.getName());
        printer.setLocation(printerInfo.getLocation());
        printer.setDescription(printerInfo.getDescription());
        printer.setState(printerInfo.getState());

        return printerRepository.save(printerInfo);
    }

    @PutMapping("/printer/{name}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable String name, @RequestBody Printer printerInfo) {
        Printer printer = printerRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("report not exist with name :" + name));

        if(printerInfo.getState() != null) {
            printer.setState(printerInfo.getState());
        }

        if(printerInfo.getLocation() != null) {
            printer.setLocation(printerInfo.getLocation());
        }

        if(printerInfo.getDescription() != null) {
            printer.setDescription(printerInfo.getDescription());
        }

        Printer updatedPrinter = printerRepository.save(printer);
        return ResponseEntity.ok(updatedPrinter);
    }

    @DeleteMapping("/printer/{name}")
    public ResponseEntity<Map<String, Boolean>> deletePrinterByID(@PathVariable String name){
        Printer printer = printerRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("report not exist with name :" + name));
        printerRepository.delete(printer);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted printer with name " + name, Boolean.TRUE);
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
