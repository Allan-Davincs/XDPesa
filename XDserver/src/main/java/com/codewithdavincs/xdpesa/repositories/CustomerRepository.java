package com.codewithdavincs.xdpesa.repositories;

import com.codewithdavincs.xdpesa.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Spring will implement this query method automatically based on naming convention
    Optional<Customer> findByPhoneNumber(String phoneNumber);
}
