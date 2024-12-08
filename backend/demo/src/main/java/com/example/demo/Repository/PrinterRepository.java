package com.example.demo.Repository;

import com.example.demo.Model.Printer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;


@Repository
public interface PrinterRepository extends JpaRepository<Printer, String> {
    Optional<Printer> findByName(String name);
    List<Printer> findByLocation(String location);
}
