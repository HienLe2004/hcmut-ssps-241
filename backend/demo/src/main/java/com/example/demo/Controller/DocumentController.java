package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.Document;
import com.example.demo.Model.Student;
import com.example.demo.Repository.DocumentRepository;
import com.example.demo.Repository.StudentRepository;

import com.example.demo.Config.FileStorageProperties;
import com.example.demo.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
@RequestMapping("/api/v1/")
public class DocumentController {
    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private StudentRepository studentRepository; //su dung de truy xuat student

    private FileStorageProperties fileStorageProperties;
    private FileService fileService; //luu file

    //get all Document
    @GetMapping("/documents")
    public List<Document> getAllDocument(){
        return documentRepository.findAllByOrderByIdAsc();
    }

    //get document by document id
    @GetMapping("/document/{id}")
    public ResponseEntity<Document> getDocumentById (@PathVariable long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + id));
        return ResponseEntity.ok(document);
    }

    //create a new document
    @PostMapping("/document/{studentId}")
    public ResponseEntity<Document> createAFile(@PathVariable long studentId, @RequestParam("file") MultipartFile file){
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // Tìm Student trong cơ sở dữ liệu bằng studentId
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        if (!optionalStudent.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Student student = optionalStudent.get();
        String file_path = fileService.saveFile(file, studentId);
        //tạo đối tượng document
        Document document = new Document();
        document.setFileName(file.getOriginalFilename());
        document.setSize(file.getSize());
        document.setFileStyle(file.getContentType());
        document.setFilePath(file_path);
        return ResponseEntity.ok(document);
    }

    //Update a document
    @PutMapping("/document/{documentId}")
    public ResponseEntity<Document> updateDocumentDetail(@PathVariable long id, @RequestBody Document documentDetail){
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + id));
        long studentId = documentDetail.getStudent().getId();
        Student student = studentRepository.findById(studentId)
        .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
        document.setStudent(student);
        if(documentDetail.getFileName()!= null) document.setFileName(documentDetail.getFileName());
        if(documentDetail.getFilePath()!= null) document.setFilePath(documentDetail.getFilePath());
        if(documentDetail.getFileStyle()!= null)document.setFileName(documentDetail.getFileStyle());
        if(String.valueOf(documentDetail.getSize())!=null)
            document.setSize(documentDetail.getSize());
        documentRepository.save(document);
        return ResponseEntity.ok(document);
    }

    //Delete All documents
    @DeleteMapping("/documents")
    public ResponseEntity<Map<String, Boolean>> deleteDocuments(){
        documentRepository.deleteAll();
        fileService.deleteAllFile();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    //Delete a document by id
    @DeleteMapping("/document/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteDocumentByID(@PathVariable long id){
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + id));
        fileService.deleteFile(document.getFilePath());
        studentRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted student with id "+id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }




}
