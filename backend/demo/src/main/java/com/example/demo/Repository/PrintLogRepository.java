package com.example.demo.Repository;

import com.example.demo.Model.PrintLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrintLogRepository extends JpaRepository<PrintLog, Long> {

}
