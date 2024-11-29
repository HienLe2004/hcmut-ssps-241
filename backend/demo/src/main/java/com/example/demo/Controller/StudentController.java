package com.example.demo.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Student;
import com.example.demo.Repository.StudentRepository;
import com.example.demo.Exception.ResourceNotFoundException;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")

public class StudentController {
    @Autowired
    private StudentRepository repo;

    //get all student
    @GetMapping("/students")
    public List<Student> getAllStudent(){
        return repo.findAll();
    }

    //get a student by id
    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id)
    {
        Student student = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        return ResponseEntity.ok(student);
    }

    //create a student
    @PostMapping("/student")
    public Student createStudent(@RequestBody Student student){
        return repo.save(student);
    }

    //update a student
    @PutMapping("/student/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable long id, @RequestBody Student studentInfo) {
        Student student = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        if( String.valueOf(studentInfo.getBalance())  != null) {
            student.setBalance(studentInfo.getBalance());
        }
        if (studentInfo.getDoB() != null) {
            student.setDoB(studentInfo.getDoB());
        }
        if (studentInfo.getEmail() != null){
            student.setEmail(studentInfo.getEmail());
        }
        if(studentInfo.getPhoneNum() != null) {
            student.setPhoneNum(studentInfo.getPhoneNum());
        }
        if(studentInfo.getName() != null) {
            student.setName(studentInfo.getName());
        }
        Student updatedStudent = repo.save(student);
        return ResponseEntity.ok(updatedStudent);
    }

    //delete a student
    @DeleteMapping("/student/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable long id){
        Student student = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        repo.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //delete all students
    @DeleteMapping("/students")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(){
        repo.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

