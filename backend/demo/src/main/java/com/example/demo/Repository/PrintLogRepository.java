package com.example.demo.Repository;

import com.example.demo.Model.PrintLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrintLogRepository extends JpaRepository<PrintLog, Long> {
    List<PrintLog> findAllByStudentId(long id);
    List<PrintLog> findAllByPrinterName(String name);
}