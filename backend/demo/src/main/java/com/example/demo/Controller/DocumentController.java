package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.Document;
import com.example.demo.Model.PaperSetting;
import com.example.demo.Model.Student;
import com.example.demo.Repository.DocumentRepository;
import com.example.demo.Repository.PaperSettingRepository;
import com.example.demo.Repository.StudentRepository;

import com.example.demo.Config.FileStorageProperties;
import com.example.demo.Service.FileService;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.Doc;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.*;
import java.nio.file.Files;
import java.nio.file.Path;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class DocumentController {
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private PaperSettingRepository paperSettingRepository;

    @Autowired
    private StudentRepository studentRepository; //su dung de truy xuat student

    private FileService fileService = new FileService(); //luu file

    //get all Document
    @GetMapping("/documents")
    public List<Document> getAllDocuments(){
        return documentRepository.findAll();
    }

    //get document by document id
    @GetMapping("/document/{id}")
    public ResponseEntity<Document> getDocumentById (@PathVariable long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + id));
        return ResponseEntity.ok(document);
    }

    //create a new document
    // @PostMapping("/document/{document_id}/{studentId}")
    // public ResponseEntity<Document> createAFile(@PathVariable long document_id,@PathVariable long studentId, @RequestParam("file") MultipartFile file) throws IOException, InvalidFormatException {
    //     if (file.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    //     }
    //     // Tìm Student trong cơ sở dữ liệu bằng studentId
    //     Optional<Student> optionalStudent = studentRepository.findById(studentId);
    //     if (!optionalStudent.isPresent()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //     }

    //     Student student = optionalStudent.get();
    //     String file_path = fileService.saveFile(file, studentId);
    //     //tạo đối tượng document
    //     Document document = new Document();
    //     document.setId(document_id);
    //     document.setFileName(file.getOriginalFilename());

    //     document.setFilePath(file_path);
    //     document.setStudent(student);


    //     String file_type = file.getContentType();
    //     PaperSetting paperSetting = paperSettingRepository.findLatestPaperSetting().get();
    //     String valid_file_type = paperSetting.getValidFileType();
    //     List<String> listFT = Arrays.asList(valid_file_type.split(","));

    //     document.setFileType(file_type);
    //     int numPage = 0;
    //     if(file_type.equals("application/pdf")) {
    //         if(!listFT.contains("pdf"))
    //             throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
    //         numPage = fileService.handlePdf(file);
    //     }
    //     else if(file_type.equals("application/msword") ||
    //             file_type.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
    //     {
    //         if(!listFT.contains("docx") && !listFT.contains("doc"))
    //             throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
    //         numPage = fileService.handleWord(file);
    //     }
    //     else if ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(file_type) ||
    //             "application/vnd.ms-excel".equals(file_type)) {
    //         try {
    //             if(!listFT.contains("xls") && !listFT.contains("xlsx"))
    //                 throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
    //             numPage = fileService.handleExcel(file);
    //         } catch (IOException e) {
    //             throw new RuntimeException(e);
    //         }
    //     }
    //         // Xử lý PowerPoint (PPT/PPTX)
    //     else if ("application/vnd.openxmlformats-officedocument.presentationml.presentation".equals(file_type) ||
    //                 "application/vnd.ms-powerpoint".equals(file_type)) {
    //         if(!listFT.contains("ppt") && !listFT.contains("pptx"))
    //             throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
    //             numPage = fileService.handlePowerPoint(file);
    //         }
    //     if (numPage <= 0) throw new ResourceNotFoundException("can't count number of pages: " + file_type);
    //     document.setNumPages(numPage);
    //     Document updateDocumnet = documentRepository.save(document);
    //     return ResponseEntity.ok(updateDocumnet);
    // }
    @PostMapping("/document/{studentId}")
    public ResponseEntity<Document> createAFile(@PathVariable long studentId, @RequestParam("file") MultipartFile file) {
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
        document.setFilePath(file_path);
        document.setStudent(student);

        String file_type = file.getContentType();
        PaperSetting paperSetting = paperSettingRepository.findLatestPaperSetting().get();
        String valid_file_type = paperSetting.getValidFileType();
        List<String> listFT = Arrays.asList(valid_file_type.split(","));

        document.setFileType(file_type);
        int numPage = 0;
        if(file_type.equals("application/pdf")) {
            if(!listFT.contains("pdf"))
                throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
            numPage = fileService.handlePdf(file);
        }
        else if(file_type.equals("application/msword") ||
                file_type.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
        {
            if(!listFT.contains("docx") && !listFT.contains("doc"))
                throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
            numPage = fileService.handleWord(file);
        }
        else if ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(file_type) ||
                "application/vnd.ms-excel".equals(file_type)) {
            try {
                if(!listFT.contains("xls") && !listFT.contains("xlsx"))
                    throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
                numPage = fileService.handleExcel(file);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
            // Xử lý PowerPoint (PPT/PPTX)
        else if ("application/vnd.openxmlformats-officedocument.presentationml.presentation".equals(file_type) ||
                    "application/vnd.ms-powerpoint".equals(file_type)) {
            if(!listFT.contains("ppt") && !listFT.contains("pptx"))
                throw new ResourceNotFoundException("type "+file_type+ " is not valid!");
                numPage = fileService.handlePowerPoint(file);
            }
        if (numPage <= 0) throw new ResourceNotFoundException("can't count number of pages: " + file_type);
        document.setNumPages(numPage);
        Document updateDocumnet = documentRepository.save(document);
        return ResponseEntity.ok(updateDocumnet);
    }
    //Update a document
    @PutMapping("/document/{documentId}")
    public ResponseEntity<Document> updateDocumentDetail(@PathVariable long id, @RequestBody Document documentDetail){
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document not exist with id :" + id));
        long studentId = documentDetail.getStudent().getId();
        if(String.valueOf(studentId)!= null)
        {
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
            // document.setStudent(student);
        }
        if(documentDetail.getFileName()!= null) document.setFileName(documentDetail.getFileName());
        if(documentDetail.getFileType()!= null)document.setFileName(documentDetail.getFileType());
        if(documentDetail.getNumPages() != 0) document.setNumPages(documentDetail.getNumPages());
        Document updateDocumnet = documentRepository.save(document);
        return ResponseEntity.ok(updateDocumnet);
    }

    //Delete All documents of a student
    @DeleteMapping("/documents")
    public ResponseEntity<Map<String, Boolean>> deleteDocuments(){
        documentRepository.deleteAll();
        fileService.deleteAllFile("documents");
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    //Delete tất cả tài liệu của sinh viên
    @DeleteMapping("/documents/{student_id}")
    public ResponseEntity<Map<String, Boolean>> deleteDocumentsofStudent(@PathVariable long student_id){
        List<Document> documents = documentRepository.findAllByStudentId(student_id);
        for(Document document: documents){
            documentRepository.delete(document);
        }
        String st_id = "documents/" +String.valueOf(student_id);
        fileService.deleteAllFile(st_id);
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
        documentRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted document with id "+id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}