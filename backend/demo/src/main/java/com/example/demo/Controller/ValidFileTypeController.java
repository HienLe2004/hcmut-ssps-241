package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.ValidFileType;
import com.example.demo.Repository.ValidFileTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ValidFileTypeController {
    private ValidFileTypeRepository validFileTypeRepository;

    @GetMapping("/validFileTypes_list")
    public List<ValidFileType> getListValidFileType(){
        return validFileTypeRepository.findAll();
    }

    @GetMapping ("/validFileType_string")
    public String getStringValidFileType(){
        List<ValidFileType> validFileTypes = validFileTypeRepository.findAll();
        StringBuilder result = new StringBuilder();
        for (ValidFileType validFileType : validFileTypes){
            result.append(validFileType.getType_name());
            result.append(", ");
        }
        // Loại bỏ ", " cuối cùng
        if (result.length() > 0) {
            result.setLength(result.length() - 2);  // Giảm độ dài để xóa ", "
        }
        return result.toString();

    }
    @PostMapping("/validFileType/{str}")
    public ResponseEntity<List<ValidFileType>> postStringValidFileType(@PathVariable String str){
        String[] result = str.split(", ");
        List<ValidFileType> validFileTypes = new ArrayList<>();
        for (String item: result){
             ValidFileType validFileType = new ValidFileType();
             validFileType.setType_name(item);
             validFileTypes.add(validFileType);
        }
        return  ResponseEntity.ok(validFileTypes);
    }
    @PostMapping("/validFileType")
    public ResponseEntity<ValidFileType> postValidFileType(@RequestBody ValidFileType validFileTypeDetail){
        ValidFileType validFileType = new ValidFileType();
        validFileType.setType_name(validFileTypeDetail.getType_name());
        validFileTypeRepository.save(validFileType);
        return ResponseEntity.ok(validFileType);
    }
    @DeleteMapping("/validFileTypes")
    public ResponseEntity<Map<String, Boolean>> deleteAllStudents(){
        validFileTypeRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
