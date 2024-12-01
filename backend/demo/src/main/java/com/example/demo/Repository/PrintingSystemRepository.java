package com.example.demo.Repository;

import com.example.demo.Model.Printer;
import com.example.demo.Model.PrintingSystem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrintingSystemRepository extends JpaRepository<PrintingSystem, Long> {
}
