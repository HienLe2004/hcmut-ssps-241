package com.example.demo.Repository;

import com.example.demo.Model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login,Long> {
    public Optional<Login> findByUsername(String username);
}
