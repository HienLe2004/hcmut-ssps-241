package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.*;
import com.example.demo.Repository.ConfigurationRepository;
import com.example.demo.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class LocationController {
    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/locations")
    public List<Location> getAllLocations(){
        return locationRepository.findAll();
    }

    @GetMapping("/location/{name}")
    public ResponseEntity<Location> getLocation(@PathVariable String name){
        Location location = locationRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("report not exist with name :" + name));
        return ResponseEntity.ok(location);
    }

    @PostMapping("/location")
    public Location createLocation(@RequestBody Location locationInfo){
        Location location = new Location();
        location.setName(locationInfo.getName());

        return locationRepository.save(locationInfo);
    }

    @DeleteMapping("/location/{name}")
    public ResponseEntity<Map<String, Boolean>> deleteLocationByID(@PathVariable String name){
        Location location = locationRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("report not exist with name :" + name));
        locationRepository.delete(location);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted location with name " + name, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/locations")
    public ResponseEntity<Map<String, Boolean>> deleteAllLocations(){
        locationRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
