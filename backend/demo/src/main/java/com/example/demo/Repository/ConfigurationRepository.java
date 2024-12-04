package com.example.demo.Repository;
import com.example.demo.Model.Printer;
import com.example.demo.Model.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfigurationRepository extends JpaRepository<Configuration, Long> {
    public Optional<Configuration> findByPrinterName(String printerName);

}
