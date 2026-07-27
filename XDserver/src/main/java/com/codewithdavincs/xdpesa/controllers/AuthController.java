package com.codewithdavincs.xdpesa.controllers;

import com.codewithdavincs.xdpesa.models.Customer;
import com.codewithdavincs.xdpesa.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Customer customer) {
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email tayari imeshasajiliwa"));
        }
        if (customerRepository.findByPhoneNumber(customer.getPhoneNumber()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Namba ya simu tayari imeshasajiliwa"));
        }
        Customer savedCustomer = customerRepository.save(customer);
        Map<String, Object> user = new HashMap<>();
        user.put("id", savedCustomer.getId());
        user.put("fullName", savedCustomer.getFullName());
        user.put("email", savedCustomer.getEmail());
        user.put("phoneNumber", savedCustomer.getPhoneNumber());
        user.put("role", "USER");

        return ResponseEntity.ok(Map.of("message", "Usajili umefanikiwa.", "user", user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> Login(@RequestBody Customer loginDetails) {
        Optional<Customer> user = customerRepository.findByEmail(loginDetails.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(loginDetails.getPassword())) {
            Customer savedCustomer = user.get();
            Map<String, Object> userPayload = new HashMap<>();
            userPayload.put("id", savedCustomer.getId());
            userPayload.put("fullName", savedCustomer.getFullName());
            userPayload.put("email", savedCustomer.getEmail());
            userPayload.put("phoneNumber", savedCustomer.getPhoneNumber());
            userPayload.put("role", "USER");
            return ResponseEntity.ok(Map.of("message", "Login imefanikiwa.", "user", userPayload));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Email au password si sahihi"));
    }
}
