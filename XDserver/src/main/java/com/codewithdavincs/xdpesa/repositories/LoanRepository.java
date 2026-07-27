package com.codewithdavincs.xdpesa.repositories;

import com.codewithdavincs.xdpesa.models.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByCustomerId(Long customerId);
}
