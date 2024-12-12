package com.example.demo.Repository;

import com.example.demo.Model.BuyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuyLogRepository extends JpaRepository<BuyLog, Long> {
    List<BuyLog> findAllByStudentId(long id);
}
