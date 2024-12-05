package com.example.demo.Controller;

import com.example.demo.Model.Document;
import com.example.demo.Model.Login;
import com.example.demo.Model.PrintLog;
import com.example.demo.Repository.LoginRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

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
    private StudentRepository studentRepository;

    @Autowired
    private LoginRepository loginRepository;

    //get all student
    @GetMapping("/students")
    public List<Student> getAllStudent(){
        return studentRepository.findAll();
    }

    //get a student by id
    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id)
    {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        return ResponseEntity.ok(student);
    }

    //get all document of student by student id
    /*@GetMapping("/{id}/documents")
    public List<Document> getDocumentById(@PathVariable Long id){
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        return student.getDocuments();
    }*/





    //create a student
    @PostMapping("/student")
    public Student createStudent(@RequestBody Student student){
        return studentRepository.save(student);
    }

    //update a student
    @PutMapping("/student/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable long id, @RequestBody Student studentInfo) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        if( studentInfo.getBalance()  != 0) {
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
        if(studentInfo.getLogin().getId()!= 0)
        {
            Login login = loginRepository.findById(studentInfo.getLogin().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Login not exist with id :" + studentInfo.getLogin().getId()));
            student.setLogin(login);

        }
        Student updatedStudent = studentRepository.save(student);
        return ResponseEntity.ok(updatedStudent);
    }

    //delete a student
    @DeleteMapping("/student/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudentByID(@PathVariable long id){
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        studentRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted student with id "+id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //delete all students
    @DeleteMapping("/students")
    public ResponseEntity<Map<String, Boolean>> deleteAllStudents(){
        studentRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}