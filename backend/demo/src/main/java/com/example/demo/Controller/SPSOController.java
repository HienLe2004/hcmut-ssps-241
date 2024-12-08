package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.Login;
import com.example.demo.Model.Printer;
import com.example.demo.Model.SPSO;
import com.example.demo.Repository.LoginRepository;
import com.example.demo.Repository.SPSORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/v1")
public class SPSOController {
    @Autowired
    private SPSORepository spsoRepository;

    @Autowired
    private LoginRepository loginRepository;

    @GetMapping("/spsos")
    public List<SPSO> getAllSPSO(){
        return spsoRepository.findAll();
    }

    @GetMapping("/spso/{id}")
    public ResponseEntity<SPSO> getSPSO(@PathVariable long id){
        SPSO spso = spsoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SPSO not exist with id :" + id));
        return ResponseEntity.ok(spso);
    }

    @GetMapping("/spso/{id}/login")
    public Login getLogin(@PathVariable long id){
        SPSO spso = spsoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SPSO not exist with id :" + id));
        return spso.getLogin();
    }

    @GetMapping("")

    @PostMapping("/spso")
    public SPSO createConfiguration(@RequestBody SPSO spso){
        long id = spso.getId();
        Optional<SPSO> spsoOptional = spsoRepository.findById(id);
        if(spsoOptional.isPresent()) throw new RuntimeException("SPSO is exist!");
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
        if(spsoInfo.getLogin().getId()!= 0)
        {
            Login login = loginRepository.findById(spsoInfo.getLogin().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Login not exist with id :" + spsoInfo.getLogin().getId()));
            spso.setLogin(login);
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
