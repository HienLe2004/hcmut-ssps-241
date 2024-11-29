package com.example.demo.Controller;

import com.example.demo.Model.Document;
import com.example.demo.Model.PrintModification;
import com.example.demo.Model.PrintRequest;
import com.example.demo.Model.Student;
import com.example.demo.Repository.DocumentRepository;
import com.example.demo.Repository.PrintModificationRepository;
import com.example.demo.Repository.PrintRequestRepository;
import com.example.demo.Controller.PrintModificationController;
import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PrintRequestController
{
    @Autowired
    private PrintRequestRepository printRequestRepository;
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private PrintModificationRepository printModificationRepository;
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/printRequests")
    public List<PrintRequest> getAllPrintRequests(){
        return printRequestRepository.findAll();
    }

    @GetMapping("/printRequest/{id}")
    public ResponseEntity<PrintRequest> getPrintRequest(@PathVariable long id){
        PrintRequest printRequest = printRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Request not exist with id :" + id));
        return ResponseEntity.ok(printRequest);
    }

    @GetMapping("/printRequest/{id}/printModification")
    public ResponseEntity<PrintModification> getPrintModification(@PathVariable long id){
        PrintRequest printRequest = printRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Request not exist with id :" + id));
        PrintModification printModification = printRequest.getPrintModification();
        return ResponseEntity.ok(printModification);
    }

    @GetMapping("/printRequest/{id}/document")
    public ResponseEntity<Document> getDocument(@PathVariable long id){
        PrintRequest printRequest = printRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Request not exist with id :" + id));
        Document document = printRequest.getDocument() ;
        return ResponseEntity.ok(document);
    }

    @PostMapping("/printRequest")
    public PrintRequest createRequest(@RequestBody PrintRequest detailPrintRequest) {
        PrintRequest printRequest = new PrintRequest();
        printRequest.setStatus(detailPrintRequest.getStatus());

        long documentId = detailPrintRequest.getDocument().getId();
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + documentId));
        printRequest.setDocument(document);

        long printModificationId = detailPrintRequest.getPrintModification().getId();
        PrintModification printModification = printModificationRepository.findById(printModificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Print Modification not exist with id :" + printModificationId));
        printRequest.setPrintModification(printModification);

        long studentId = detailPrintRequest.getStudent().getId();
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + studentId));
        printRequest.setStudent(student);

        return printRequestRepository.save(printRequest);
    }

    @PutMapping("/printRequest/{id}")
    public ResponseEntity<PrintRequest> updatePrintRequest(@PathVariable long id, @RequestBody PrintRequest updateRequest)
    {
        PrintRequest printRequest = printRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Request not exist with id :" + id));
        if(updateRequest.getStatus() != null)
            printRequest.setStatus(updateRequest.getStatus());
        if(String.valueOf(updateRequest.getStudent().getId()) != null)
        {
            long studentId = updateRequest.getStudent().getId();
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + studentId));
            printRequest.setStudent(student);
        }
        if(String.valueOf(updateRequest.getPrintModification().getId())!= null){
            long printModificationId = updateRequest.getPrintModification().getId();
            PrintModification printModification = printModificationRepository.findById(printModificationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Print Modification not exist with id :" + printModificationId));
            printRequest.setPrintModification(printModification);
        }
        if(String.valueOf(updateRequest.getDocument().getId())!= null){
            long documentId = updateRequest.getDocument().getId();
            Document document = documentRepository.findById(documentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + documentId));
            printRequest.setDocument(document);
        }
        PrintRequest printRequest1 = printRequestRepository.save(printRequest);
        return ResponseEntity.ok(printRequest1);
    }

    @DeleteMapping("/printRequests")
    //delete print request
    public ResponseEntity<Map<String, Boolean>> deletePrintRequests(){
        printRequestRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/printRequest/{id}")
    //delete a print request by id
    public ResponseEntity<Map<String, Boolean>> deletePrintRequestById(@PathVariable long id){
        PrintRequest printRequest = printRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Request not exist with id :" + id));
        studentRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted print request with id "+id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}