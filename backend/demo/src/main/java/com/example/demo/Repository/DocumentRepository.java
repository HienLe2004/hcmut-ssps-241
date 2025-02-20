package com.example.demo.Repository;

import com.example.demo.Model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByOrderByIdAsc();
    List<Document> findAllByStudentId(long student_id);
}