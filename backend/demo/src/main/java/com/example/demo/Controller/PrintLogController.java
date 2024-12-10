package com.example.demo.Controller;

import com.example.demo.Model.*;
import com.example.demo.Repository.*;
import com.example.demo.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PrintLogController
{
    @Autowired
    private PrintLogRepository printLogRepository;
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private PrintModificationRepository printModificationRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private PrinterRepository printerRepository;

    @GetMapping("/printLogs")
    public List<PrintLog> getAllPrintLogs(){
        return printLogRepository.findAll();
    }

    @GetMapping("/printLog/{id}")
    public ResponseEntity<PrintLog> getPrintLog(@PathVariable long id){
        PrintLog printRequest = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Log not exist with id :" + id));
        return ResponseEntity.ok(printRequest);
    }

    @GetMapping("/student/{id}/printLogs")
    public List<PrintLog> getPrintLogsOfStudent(@PathVariable long id)
    {
        List<PrintLog> printLogs = printLogRepository.findAllByStudentId(id);
        return printLogs;
    }

    @GetMapping("printer/{name}/printLogs")
    public List<PrintLog> getPrintLogByPrinterName(@PathVariable String name)
    {
        System.out.println(name);
        List<PrintLog> printLogs = printLogRepository.findAllByPrinterName(name);
        return printLogs;
    }

    @GetMapping("/printLog/{id}/printModification")
    public ResponseEntity<PrintModification> getPrintModification(@PathVariable long id){
        PrintLog printRequest = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Log not exist with id :" + id));
        PrintModification printModification = printRequest.getPrintModification();
        return ResponseEntity.ok(printModification);
    }

    @GetMapping("/printLog/{id}/document")
    public ResponseEntity<Document> getDocument(@PathVariable long id){
        PrintLog printRequest = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Log not exist with id :" + id));
        Document document = printRequest.getDocument() ;
        return ResponseEntity.ok(document);
    }

    @PostMapping("/printLog")
    public PrintLog createRequest(@RequestBody PrintLog detailPrintRequest) {
        PrintLog printRequest = new PrintLog();
        if (detailPrintRequest.getStatus() == null) {
            printRequest.setStatus("Đang xử lí");
        } 
        else {
            printRequest.setStatus(detailPrintRequest.getStatus());
        }

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

        String printerName = detailPrintRequest.getPrinter().getName();
        Printer printer = printerRepository.findByName(printerName)
                .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with name :" + printerName));
        printRequest.setPrinter(printer);

        return printLogRepository.save(printRequest);
    }

    @PutMapping("/printLog/{id}")
    public ResponseEntity<PrintLog> updatePrintRequest(@PathVariable long id, @RequestBody PrintLog updateRequest)
    {
        PrintLog printRequest = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Request not exist with id :" + id));
        if(updateRequest.getStatus() != null)
            printRequest.setStatus(updateRequest.getStatus());
        if(updateRequest.getStartTime() != null)
            printRequest.setStartTime(updateRequest.getStartTime());
        if(updateRequest.getFinishedTime() != null)
            printRequest.setFinishedTime(updateRequest.getFinishedTime());
        if(updateRequest.getStudent() != null && updateRequest.getStudent().getId() != 0)
        {
            long studentId = updateRequest.getStudent().getId();
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + studentId));
            printRequest.setStudent(student);
        }
        if(updateRequest.getPrintModification() != null && updateRequest.getPrintModification().getId()!= 0){
            long printModificationId = updateRequest.getPrintModification().getId();
            PrintModification printModification = printModificationRepository.findById(printModificationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Print Modification not exist with id :" + printModificationId));
            printRequest.setPrintModification(printModification);
        }
        if(updateRequest.getDocument() != null && updateRequest.getDocument().getId() != 0){
            long documentId = updateRequest.getDocument().getId();
            Document document = documentRepository.findById(documentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + documentId));
            printRequest.setDocument(document);
        }
        if(updateRequest.getPrinter() != null && updateRequest.getPrinter().getName()!= null)
        {
            String printerName = updateRequest.getPrinter().getName();
            Printer printer = printerRepository.findByName(printerName)
                    .orElseThrow(() -> new ResourceNotFoundException("Printer not exist with name :" + printerName));
            printRequest.setPrinter(printer);
        }
        PrintLog printRequest1 = printLogRepository.save(printRequest);
        return ResponseEntity.ok(printRequest1);
    }

    @DeleteMapping("/printLogs")
    //delete print request
    public ResponseEntity<Map<String, Boolean>> deletePrintRequests(){
        printLogRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/printLog/{id}")
    //delete a print request by id
    public ResponseEntity<Map<String, Boolean>> deletePrintRequestById(@PathVariable long id){
        PrintLog printRequest = printLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Print Request not exist with id :" + id));
        studentRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted print request with id "+id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}