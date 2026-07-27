package com.codewithdavincs.xdpesa.controllers;

import com.codewithdavincs.xdpesa.models.Customer;
import com.codewithdavincs.xdpesa.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired

    private CustomerRepository customerRepository;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Customer customer) {
        if (customerRepository.findByPhoneNumber(customer.getPhoneNumber()).isPresent()) {
            return ResponseEntity.badRequest().body("Namba ya Simu tayari imeshasajiliwa");
        }
        customerRepository.save(customer);
        return ResponseEntity.ok("Usajili wa " + customer.getFullName() + " umefanikiwa kikamilifu");
    }

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody Customer loginDetails) {
        Optional<Customer> user = customerRepository.findByPhoneNumber(loginDetails.getPhoneNumber());
        if (user.isPresent() && user.get().getPassword().equals(loginDetails.getPassword())) {
            return ResponseEntity.ok("Login imefanikiwa, karibu ! " + user.get().getFullName());
        }
        return ResponseEntity.status(401).body("Namba ya simu au password si sahihi");
    }
}
