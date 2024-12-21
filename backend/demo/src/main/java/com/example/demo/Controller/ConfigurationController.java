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
//may be not using this controller
public class ConfigurationController {
    @Autowired
    private ConfigurationRepository configurationRepository;

    @Autowired
    private PrinterRepository printerRepository;

    @GetMapping("/configurations")
    public List<Configuration> getAllConfigurations(){
        return configurationRepository.findAll();
    }

    @GetMapping("/configuration/{id}")
    public ResponseEntity<Configuration> getConfiguration(@PathVariable long id){
        Configuration configuration = configurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Configuration not exist with id :" + id));
        return ResponseEntity.ok(configuration);
    }
    @GetMapping("/configuration/printer/{printer_name}")
    public ResponseEntity<Configuration> getConfigurationByPrintername(@PathVariable String printer_name){
        Printer printer = printerRepository.findByName(printer_name)
                .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with name :" + printer_name));

        Configuration configuration = configurationRepository.findByPrinterName(printer_name)
                .orElseThrow(()-> new ResourceNotFoundException("Printer " + printer_name+ "have no Configuration"));
        return ResponseEntity.ok(configuration);
    }

    @PostMapping("/configuration")
    public Configuration createConfiguration(@RequestBody Configuration configuration){
        return configurationRepository.save(configuration);
    }

    @PutMapping("/configuration/{id}")
    public ResponseEntity<Configuration> updateConfiguration(@PathVariable long id, @RequestBody Configuration configurationInfo) {
        String printer_name = configurationInfo.getPrinter().getName();
        Printer printer = printerRepository.findByName(printer_name)
                .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with name :" + printer_name));
        Configuration configuration = configurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Configuration not exist with id :" + id));

        if(configurationInfo.getDuplexPrinting() != null){
            configuration.setDuplexPrinting(configurationInfo.getDuplexPrinting());
        }

        if(configurationInfo.getBrand()!= null){
            configuration.setBrand(configurationInfo.getBrand());
        }

        if(configurationInfo.getModel()!=null){
            configuration.setModel(configurationInfo.getModel());
        }

        if(configurationInfo.getTechnology()!=null) {
            configuration.setTechnology(configurationInfo.getTechnology());
        }
        if(configurationInfo.getPrinter().getName()!= null){
            configuration.setPrinter(printer);
        }
        Configuration updatedConfiguration = configurationRepository.save(configuration);
        return ResponseEntity.ok(updatedConfiguration);
    }

    @PutMapping("/configuration/printer/{printer_name}")
    public ResponseEntity<Configuration> updateConfigurationByPrinterName(@PathVariable String printer_name, @RequestBody Configuration configurationInfo) {
        Printer printer = printerRepository.findByName(printer_name)
                .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with name :" + printer_name));

        Configuration configuration = configurationRepository.findByPrinterName(printer_name)
                .orElseThrow(()-> new ResourceNotFoundException("Printer " + printer_name+ "have no Configuration"));

        if(configurationInfo.getDuplexPrinting() != null){
            configuration.setDuplexPrinting(configurationInfo.getDuplexPrinting());
        }

        if(configurationInfo.getBrand()!= null){
            configuration.setBrand(configurationInfo.getBrand());
        }

        if(configurationInfo.getModel()!=null){
            configuration.setModel(configurationInfo.getModel());
        }

        if(configurationInfo.getTechnology()!=null) {
            configuration.setTechnology(configurationInfo.getTechnology());
        }
        configuration.setPrinter(printer);
        Configuration updatedConfiguration = configurationRepository.save(configuration);
        return ResponseEntity.ok(updatedConfiguration);
    }

    @DeleteMapping("/configuration/printer/{printer_name}")
    public ResponseEntity<Map<String, Boolean>> deleteConfigurationByPrinterName(@PathVariable String printer_name){
        Printer printer = printerRepository.findByName(printer_name)
                .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with name :" + printer_name));

        Configuration configuration = configurationRepository.findByPrinterName(printer_name)
                .orElseThrow(()-> new ResourceNotFoundException("Printer " + printer_name+ "have no Configuration"));
        configurationRepository.delete(configuration);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted configuration of printer " + printer_name, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/configuration/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteConfigurationByID(@PathVariable long id){
        Configuration configuration = configurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Configuration not exist with id :" + id));
        configurationRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted configuration with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/configurations")
    public ResponseEntity<Map<String, Boolean>> deleteAllConfigurations(){
        configurationRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
