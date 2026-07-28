package com.codewithdavincs.xdpesa.controllers;

import com.codewithdavincs.xdpesa.models.Customer;
import com.codewithdavincs.xdpesa.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

// Inaashiria kuwa hii ni REST Controller kwa ajili ya ku-handle API requests
@RestController
// Inaweka prefix ya URL njia kuu ya API za utambulisho (/api/auth)
@RequestMapping("/api/auth")
// Inaruhusu maombi (requests) kutoka domain yoyote (CORS)
@CrossOrigin(origins = "*")
public class AuthController {

    // Inaingiza dependency ya CustomerRepository kwa ajili ya mawasiliano na database
    @Autowired
    private CustomerRepository customerRepository;

    /**
     * Endpoint ya kusajili mteja mpya (/api/auth/register)
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Customer customer) {

        // Kagua kama email imeshachukuliwa na mtumiaji mwingine
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email tayari imeshasajiliwa"));
        }

        // Kagua kama namba ya simu imeshachukuliwa
        if (customerRepository.findByPhoneNumber(customer.getPhoneNumber()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Namba ya simu tayari imeshasajiliwa"));
        }

        // Hifadhi mteja mpya kwenye database
        Customer savedCustomer = customerRepository.save(customer);

        // Tengeneza payload ya taarifa za mtumiaji bila kurudisha password
        Map<String, Object> user = new HashMap<>();
        user.put("id", savedCustomer.getId());
        user.put("fullName", savedCustomer.getFullName());
        user.put("email", savedCustomer.getEmail());
        user.put("phoneNumber", savedCustomer.getPhoneNumber());
        user.put("role", "USER");

        // Rudisha majibu ya mafanikio (HTTP 200 OK)
        return ResponseEntity.ok(Map.of("message", "Usajili umefanikiwa.", "user", user));
    }

    /**
     * Endpoint ya kuingia kwenye mfumo (/api/auth/login)
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> Login(@RequestBody Customer loginDetails) {

        // Tafuta mteja kwenye database kwa kutumia email
        Optional<Customer> user = customerRepository.findByEmail(loginDetails.getEmail());

        // Hakikisha mtumiaji yupo na password aliyoingiza inafanana na iliyopo kwenye database
        if (user.isPresent() && user.get().getPassword().equals(loginDetails.getPassword())) {
            Customer savedCustomer = user.get();

            // Tengeneza taarifa za mtumiaji zatakazorudishwa
            Map<String, Object> userPayload = new HashMap<>();
            userPayload.put("id", savedCustomer.getId());
            userPayload.put("fullName", savedCustomer.getFullName());
            userPayload.put("email", savedCustomer.getEmail());
            userPayload.put("phoneNumber", savedCustomer.getPhoneNumber());
            userPayload.put("role", "USER");

            return ResponseEntity.ok(Map.of("message", "Login imefanikiwa.", "user", userPayload));
        }

        // Kama email au password si sahihi, rudisha kosa la Unauthorized (HTTP 401)
        return ResponseEntity.status(401).body(Map.of("message", "Email au password si sahihi"));
    }

    /**
     * Endpoint ya kuchukua orodha ya watumiaji wote (/api/auth/users)
     */
    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {

        // Leta wateja wote kutoka kwenye database
        List<Customer> customers = customerRepository.findAll();

        // Chuja taarifa za kila mteja ili kuondoa sensitive data (kama password) kabla ya kurudisha
        List<Map<String, Object>> users = customers.stream().map(customer -> {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", customer.getId());
            userMap.put("fullName", customer.getFullName());
            userMap.put("email", customer.getEmail());
            userMap.put("phoneNumber", customer.getPhoneNumber());
            userMap.put("role", "USER");
            return userMap;
        }).toList();

        return ResponseEntity.ok(users);
    }
}