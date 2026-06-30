package com.codewithdavincs.xdpesa.repositories;

import com.codewithdavincs.xdpesa.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Spring itatengeneza SQL ya kutafuta mteja kwa namba ya simu kiotomatiki!
    static Optional<Customer> findByPhoneNumber(String phoneNumber) {
        return null;
    }
}