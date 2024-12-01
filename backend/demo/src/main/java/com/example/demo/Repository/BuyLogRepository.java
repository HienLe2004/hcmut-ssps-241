package com.example.demo.Repository;

import com.example.demo.Model.BuyLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuyLogRepository extends JpaRepository<BuyLog, Long> {
}
