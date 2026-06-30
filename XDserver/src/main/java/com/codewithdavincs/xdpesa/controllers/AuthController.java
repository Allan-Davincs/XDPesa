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
    public ResponseEntity<String>register(@RequestBody Customer customer){
        if (CustomerRepository.findByPhoneNumber(customer.getPhoneNumber()).isPresent()){
            return ResponseEntity.badRequest().body("Namba ya Simu tayr imeshasajiliwa");
        }
        customerRepository.save(customer);
        return ResponseEntity.ok("usajili wa " + customer.getFullName() + "Umefanikiwa Kikamilifu");
    }

    @PostMapping("/login")
    public ResponseEntity<String>Login(@RequestBody Customer loginDetails){
        Optional<Customer> user = CustomerRepository.findByPhoneNumber(loginDetails.getPhoneNumber());
        if (user.isPresent() && user.get().getPassword().equals(loginDetails.getPassword())) {

            return ResponseEntity.ok("Login Imefanikiwa  Karibu !" + user.get().getFullName());

        }
        return ResponseEntity.status(401).body("Namba ya Simu au Password Si  Sahihi");
    }
}
