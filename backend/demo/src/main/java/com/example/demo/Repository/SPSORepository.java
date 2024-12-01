package com.example.demo.Repository;

import com.example.demo.Model.Configuration;
import com.example.demo.Model.SPSO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SPSORepository extends JpaRepository<SPSO, Long> {
}
