package com.example.demo.Repository;

import com.example.demo.Model.PrintModification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrintModificationRepository extends JpaRepository<PrintModification, Long> {
}
