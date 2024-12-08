package com.example.demo.Controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.Model.BuyLog;
import com.example.demo.Model.Login;
import com.example.demo.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/v1")
public class LoginController {
    @Autowired
    private LoginRepository loginRepository;

    @GetMapping("/logins")
    public List<Login> getAllLogin(){
        return loginRepository.findAll();
    }

    @GetMapping("/login/{id}")
    public ResponseEntity<Login> getLoginById(@PathVariable long id){
        Login login = loginRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("login not exist with id: "+ id));
        return ResponseEntity.ok(login);
    }

    @PostMapping("/login")
    public Login createNewLogin(@RequestBody Login login)
    {
        String username = login.getUsername();
        Optional<Login> loginOptional = loginRepository.findByUsername(username);
        if (loginOptional.isPresent())
            throw new RuntimeException("username" + username+ "is exist");
        return loginRepository.save(login);
    }

    @PutMapping("/login/{id}")
    public ResponseEntity<Login> updateLogin(@PathVariable long id, @RequestBody Login loginInfo){
        Login login = loginRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("login not exist with id: "+ id));
        login.setPassword(loginInfo.getPassword());
        Login newLogin = loginRepository.save(login);
        return ResponseEntity.ok(login);
    }

    @DeleteMapping("/login/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLoginById(@PathVariable long id, @RequestBody Login loginInfo){
        Login login = loginRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("login not exist with id: "+ id));
        loginRepository.delete(login);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted login with id " + id, Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/logins")
    public ResponseEntity<Map<String, Boolean>> deleteAllLogins(){
        loginRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted all", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }




}
