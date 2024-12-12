package com.example.demo.Controller;


import com.example.demo.Model.PaperSetting;
import com.example.demo.Repository.PaperSettingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Exception.ResourceNotFoundException;

import javax.print.Doc;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.nio.file.Files;
import java.nio.file.Path;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class PaperSettingController {
    @Autowired
    private PaperSettingRepository paperSettingRepository;

    @GetMapping("/paperSettings/{id}")
    private PaperSetting getPaperSetting(@PathVariable long id){
        PaperSetting paperSetting = paperSettingRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Paper Setting not exist with id: "+id));
        return paperSetting;
    }

    @GetMapping("/paperSetting")
    private ResponseEntity <PaperSetting> GetLatestPaperSetting(){
        return paperSettingRepository.findLatestPaperSetting()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/paperSetting")
    private PaperSetting createPaperSetting (@RequestBody PaperSetting paperSetting){
        return paperSettingRepository.save(paperSetting);
    }

    @PutMapping("/paperSetting/{id}")
    private PaperSetting updatePaperSetting (@PathVariable long id, @RequestBody PaperSetting paperSettingInfo){
        PaperSetting paperSetting = paperSettingRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Paper Setting not exist with id: "+id));
        if(paperSettingInfo.getPapersize() != null){
            paperSetting.setPapersize(paperSettingInfo.getPapersize());
        }
        if(paperSettingInfo.getNumPage()!= 0){
            paperSetting.setNumPage(paperSettingInfo.getNumPage());
        }
        if(paperSettingInfo.getSettingDate()!= null){
            paperSetting.setSettingDate(paperSettingInfo.getSettingDate());
        }
        if(paperSettingInfo.getValidFileType() != null){
            paperSetting.setValidFileType(paperSettingInfo.getValidFileType());
        }
        return paperSettingRepository.save(paperSetting);
    }

    @DeleteMapping("/paperSettings")
    private ResponseEntity<Map<String, Boolean>> deleteAllPaperSetting(){
        paperSettingRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/paperSetting/{id}")
    private ResponseEntity<Map<String, Boolean>> deleteAllPaperSetting(@PathVariable long id){
        PaperSetting paperSetting = paperSettingRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Paper Setting not exist with id: "+id));
        paperSettingRepository.delete(paperSetting);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
