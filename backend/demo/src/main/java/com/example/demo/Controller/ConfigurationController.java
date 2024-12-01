package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.*;
import com.example.demo.Repository.ConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ConfigurationController {
    @Autowired
    private ConfigurationRepository configurationRepository;

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

    @PostMapping("/configuration")
    public Configuration createConfiguration(@RequestBody Configuration configuration){
        return configurationRepository.save(configuration);
    }

    @PutMapping("/configuration/{id}")
    public ResponseEntity<Configuration> updateConfiguration(@PathVariable long id, @RequestBody Configuration configurationInfo) {
        Configuration configuration = configurationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Configuration not exist with id :" + id));

        if(String.valueOf(configurationInfo.getGivenPage()) != null) {
            configuration.setGivenPage(configurationInfo.getGivenPage());
        }

        if(String.valueOf(configurationInfo.getPageSize()) != null) {
            configuration.setPageSize(configurationInfo.getPageSize());
        }

        if(configurationInfo.getpermittedFile() != null){
            configuration.setpermittedFile(configurationInfo.getpermittedStringFile());
        }



        Configuration updatedConfiguration = configurationRepository.save(configuration);
        return ResponseEntity.ok(updatedConfiguration);
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

    @DeleteMapping("/configuration")
    public ResponseEntity<Map<String, Boolean>> deleteAllConfigurations(){
        configurationRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
