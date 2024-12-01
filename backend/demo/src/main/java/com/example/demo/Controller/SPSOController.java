package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.Printer;
import com.example.demo.Model.SPSO;
import com.example.demo.Repository.SPSORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class SPSOController {
    @Autowired
    private SPSORepository spsoRepository;

    @GetMapping("/spso/{id}")
    public ResponseEntity<SPSO> getSPSO(@PathVariable long id){
        SPSO spso = spsoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SPSO not exist with id :" + id));
        return ResponseEntity.ok(spso);
    }

    @PostMapping("/spso")
    public SPSO createConfiguration(@RequestBody SPSO spso){
        return spsoRepository.save(spso);
    }

    @PutMapping("/spso/{id}")
    public ResponseEntity<SPSO> updateSPSO(@PathVariable long id, @RequestBody SPSO spsoInfo) {
        SPSO spso = spsoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SPSO not exist with id :" + id));

        if (spsoInfo.getDoB() != null) {
            spso.setDoB(spso.getDoB());
        }
        if (spsoInfo.getEmail() != null){
            spso.setEmail(spsoInfo.getEmail());
        }
        if(spsoInfo.getPhoneNum() != null) {
            spso.setPhoneNum(spsoInfo.getPhoneNum());
        }
        if(spsoInfo.getName() != null) {
            spso.setName(spsoInfo.getName());
        }



        SPSO updatedSPSO = spsoRepository.save(spso);
        return ResponseEntity.ok(updatedSPSO);
    }

    @DeleteMapping("/spso/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSPSOByID(@PathVariable long id){
        SPSO spso = spsoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SPSO not exist with id :" + id));
        spsoRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted SPSO with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/spsos")
    public ResponseEntity<Map<String, Boolean>> deleteAllSPSOs(){
        spsoRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
