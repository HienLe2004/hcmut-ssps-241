package com.example.demo.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.demo.Model.PrintModification;
import com.example.demo.Repository.PrintModificationRepository;
import com.example.demo.Exception.ResourceNotFoundException;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")

public class PrintModificationController {
    @Autowired
    private PrintModificationRepository printModificationRepository;

    //get all print modifications list
    @GetMapping("/printModifications")
    public List<PrintModification> getAllPrintModification(){
        return printModificationRepository.findAll();
    }

    //get modification list by id
    @GetMapping("/printModifications/{id}")
    public ResponseEntity<PrintModification> getPrintModificationById(@PathVariable long id){
        PrintModification printModification = printModificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Modification not exist with id :" + id));
        return ResponseEntity.ok(printModification);
    }

    //create a new print modification
    @PostMapping("/printModification")
    public PrintModification createPrintModification(@RequestBody PrintModification printModification){
        return printModificationRepository.save(printModification);
    }

    /*@PostMapping("/PrintModification")
    public long createPrintModification(@RequestBody PrintModification printModification){
        printModificationRepository.save(printModification);
        return printModification.getId();
    }*/

    //upload a new print modification by id
    @PutMapping("/printModification/{id}")
    public ResponseEntity <PrintModification> updatePrintModification(@PathVariable long id,@RequestBody PrintModification newPM){
        PrintModification printModification = printModificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Modification not exist with id :" + id));
        if(newPM.getPaperSize() != null) {
            printModification.setPaperSize(newPM.getPaperSize());
        }
        if(String.valueOf(newPM.isDoubleSided()) != null){
            printModification.setDoubleSided(newPM.isDoubleSided());
        }
        if(newPM.getCopies() != 0){
            printModification.setCopies(newPM.getCopies());
        }
        return ResponseEntity.ok(printModification);
    }

    //delete all Print Modifications
    @DeleteMapping("/printModifications")
    public ResponseEntity<Map<String,Boolean>> deleteAllPrintModification(){
        printModificationRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //delete Print Modification by Id
    @DeleteMapping("printModification/{id}")
    public ResponseEntity<Map<String,Boolean>> deletePrintModificationById(@PathVariable long id){
        PrintModification printModification = printModificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Modification not exist with id :" + id));
        printModificationRepository.delete(printModification);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted Print Modification with id "+id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }



}
